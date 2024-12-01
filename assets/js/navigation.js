async function loadCategories() {
    try {
        const response = await fetch('/content/categories/categories.json');
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.error('Error loading categories:', error);
        return [];
    }
}

async function populateNavigation() {
    const categories = await loadCategories();
    const nav = document.getElementById('dynamicNav');
    
    categories.forEach(category => {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'nav-link';
        link.textContent = category.name;
        link.setAttribute('data-category', category.id);
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            filterPostsByCategory(category.id);
            
            // Update active state
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            link.classList.add('active');
        });
        
        nav.appendChild(link);
    });
    
    // Add 'All' link
    const allLink = document.createElement('a');
    allLink.href = '#';
    allLink.className = 'nav-link active';
    allLink.textContent = 'All';
    allLink.addEventListener('click', (e) => {
        e.preventDefault();
        showAllPosts();
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        allLink.classList.add('active');
    });
    nav.insertBefore(allLink, nav.firstChild);
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', populateNavigation);