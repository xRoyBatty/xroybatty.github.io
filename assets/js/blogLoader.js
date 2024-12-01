async function loadFeaturedPosts() {
  try {
    const response = await fetch('/content/featured/featured.json');
    const data = await response.json();
    return data.featured_posts;
  } catch (error) {
    console.error('Error loading featured posts:', error);
    return [];
  }
}

async function displayFeaturedPosts() {
  const posts = await loadFeaturedPosts();
  const container = document.getElementById('featuredPosts');
  
  posts.forEach(post => {
    const article = document.createElement('article');
    article.className = 'post-card featured-post';
    
    article.innerHTML = `
      <img src="${post.image}" alt="${post.image_alt}" class="post-image">
      <div class="post-content">
        <span class="post-category">${post.category}</span>
        <time class="post-date">${post.date}</time>
        <h2 class="post-title">
          <a href="/posts/${post.id}.html">${post.title}</a>
        </h2>
        <p class="post-excerpt">${post.excerpt}</p>
        <a href="/posts/${post.id}.html" class="read-more">Read more →</a>
      </div>
    `;
    
    container.appendChild(article);
  });
}

// Initialize featured posts on page load
document.addEventListener('DOMContentLoaded', displayFeaturedPosts);