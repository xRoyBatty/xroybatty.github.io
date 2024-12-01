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

async function updateNavigation() {
  const categories = await loadCategories();
  const navContainer = document.getElementById('dynamicNav');
  const footerCategories = document.getElementById('footerCategories');
  
  // Update header navigation
  categories.forEach(category => {
    const link = document.createElement('a');
    link.href = `/${category.slug}.html`;
    link.className = 'nav-link';
    link.textContent = category.name;
    navContainer.appendChild(link);
  });
  
  // Update footer categories
  categories.forEach(category => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `/${category.slug}.html`;
    link.textContent = category.name;
    li.appendChild(link);
    footerCategories.appendChild(li);
  });
}

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', updateNavigation);