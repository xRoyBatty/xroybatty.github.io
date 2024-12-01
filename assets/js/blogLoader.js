let allPosts = [];

async function loadFeaturedPosts() {
    try {
        const response = await fetch('/content/featured/featured.json');
        const data = await response.json();
        allPosts = data.featured_posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        return allPosts;
    } catch (error) {
        console.error('Error loading featured posts:', error);
        return [];
    }
}

function displayPosts(posts) {
    const container = document.getElementById('featuredPosts');
    container.innerHTML = ''; // Clear existing posts
    
    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'post-card';
        
        article.innerHTML = `
            <img src="${post.image}" alt="${post.image_alt}" class="post-image">
            <div class="post-content">
                <span class="post-category">${post.category}</span>
                <time class="post-date">${formatDate(post.date)}</time>
                <h2 class="post-title">
                    <a href="/content/posts/${post.id}/index.html">${post.title}</a>
                </h2>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="/content/posts/${post.id}/index.html" class="read-more">Read more →</a>
            </div>
        `;
        
        container.appendChild(article);
    });
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function filterPostsByCategory(category) {
    const filteredPosts = allPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
    );
    displayPosts(filteredPosts);
}

function showAllPosts() {
    displayPosts(allPosts);
}

// Initialize posts display
async function initializeBlog() {
    await loadFeaturedPosts();
    showAllPosts();
}

document.addEventListener('DOMContentLoaded', initializeBlog);