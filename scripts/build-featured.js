// Build script to generate featured.json from individual post metadata

async function buildFeaturedJson() {
  try {
    // Read all post directories
    const postDirs = await window.fs.readdir('content/posts');
    const posts = [];
    
    // Read meta.json from each post directory
    for (const dir of postDirs) {
      if (!dir.startsWith('.')) { // Skip hidden files
        try {
          const metaContent = await window.fs.readFile(`content/posts/${dir}/meta.json`, 'utf8');
          const meta = JSON.parse(metaContent);
          posts.push(meta);
        } catch (err) {
          console.error(`Error reading metadata for ${dir}:`, err);
        }
      }
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Create the featured.json content
    const featured = {
      featured_posts: posts,
      last_updated: new Date().toISOString()
    };
    
    // Write the featured.json file
    await window.fs.writeFile(
      'content/featured/featured.json',
      JSON.stringify(featured, null, 2),
      'utf8'
    );
    
    console.log('Successfully generated featured.json');
  } catch (error) {
    console.error('Error building featured.json:', error);
  }
}

// Run the build script
buildFeaturedJson();