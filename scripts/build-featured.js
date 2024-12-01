const fs = require('fs').promises;
const path = require('path');

async function buildFeaturedJson() {
    try {
        // Read all post directories
        const postsDir = path.join(__dirname, '../content/posts');
        const postDirs = await fs.readdir(postsDir);
        const posts = [];
        
        // Read meta.json from each post directory
        for (const dir of postDirs) {
            if (!dir.startsWith('.')) {
                try {
                    const metaPath = path.join(postsDir, dir, 'meta.json');
                    const metaContent = await fs.readFile(metaPath, 'utf8');
                    const meta = JSON.parse(metaContent);
                    posts.push(meta);
                } catch (err) {
                    console.error(`Error reading metadata for ${dir}:`, err);
                }
            }
        }
        
        // Sort posts by date (newest first)
        posts.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateB - dateA === 0) {
                // If dates are the same, sort by title alphabetically
                return a.title.localeCompare(b.title);
            }
            return dateB - dateA;
        });
        
        // Create the featured.json content
        const featured = {
            featured_posts: posts,
            last_updated: new Date().toISOString()
        };
        
        // Write the featured.json file
        const featuredPath = path.join(__dirname, '../content/featured/featured.json');
        await fs.writeFile(
            featuredPath,
            JSON.stringify(featured, null, 2),
            'utf8'
        );
        
        console.log('Successfully generated featured.json');
        console.log(`Total posts: ${posts.length}`);
        console.log('Posts are sorted by date (newest first)');
    } catch (error) {
        console.error('Error building featured.json:', error);
        process.exit(1);
    }
}

// Run the build script
buildFeaturedJson();