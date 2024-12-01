# Blog Post Creation Instructions

This document provides the complete workflow for creating and publishing blog posts on xroybatty.github.io.

# Complete Blog Management Guide

## Repository Structure
```
xroybatty.github.io/
├── index.html                   # Dynamic loader template (DO NOT MODIFY)
├── assets/
│   ├── css/
│   │   └── style.css           # Global styles
│   └── js/
│       ├── blogLoader.js       # Handles post loading
│       └── navigation.js       # Manages navigation
├── content/
│   ├── posts/                  # All blog posts directories
│   │   └── YYYY-MM-DD-slug/   # Individual post directory
│   │       ├── index.html     # Post content
│   │       ├── meta.json      # Post metadata
│   │       └── assets/        # Post-specific assets
│   ├── categories/            
│   │   └── categories.json    # Available categories
│   └── featured/             
│       └── featured.json      # Featured posts configuration
└── templates/
    └── post.html              # Post template
```

## Post Metadata Structure

1. `meta.json` (Required for each post):
```json
{
  "id": "2024-12-01-my-post-title",
  "title": "My Post Title",
  "date": "2024-12-01",
  "author": "Roy",
  "category": "Technology",
  "tags": ["tag1", "tag2"],
  "excerpt": "Brief description for listings",
  "coverImage": "/api/placeholder/800/400",
  "coverImageAlt": "Description of cover image",
  "readTime": "5 min"
}
```

2. `categories.json` (Global configuration):
```json
{
  "categories": [
    {
      "id": "technology",
      "name": "Technology",
      "description": "Posts about technology",
      "slug": "technology"
    },
    {
      "id": "programming",
      "name": "Programming",
      "description": "Programming tutorials and tips",
      "slug": "programming"
    }
  ]
}
```

3. `featured.json` (Global configuration):
```json
{
  "featured_posts": [
    {
      "postId": "2024-12-01-my-post-title",
      "priority": 1
    },
    {
      "postId": "2024-12-01-another-post",
      "priority": 2
    }
  ]
}
```

## Post Creation Process

1. **Prepare Post Content**
   - Create new directory in `content/posts/` using format: `YYYY-MM-DD-post-slug/`
   - Inside this directory:
     - Create `index.html` for post content
     - Create `meta.json` for post metadata
     - Create `assets/` directory if needed for post-specific files

2. **Create Post Files**

   a. `index.html` template:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>{POST_TITLE} - Roy's Blog</title>
       <meta name="description" content="{POST_EXCERPT}">
       <link href="/assets/css/style.css" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
   </head>
   <body>
       <header class="site-header">
           <div class="nav-container container">
               <a href="/" class="site-title">Roy's Blog</a>
               <nav class="nav-links">
                   <a href="/" class="nav-link">Home</a>
                   <a href="/about" class="nav-link">About</a>
                   <a href="/archive" class="nav-link">Archive</a>
               </nav>
           </div>
       </header>

       <main class="container main-content">
           <article class="post">
               <header class="post-header">
                   <div class="post-meta">
                       <time datetime="{POST_DATE}">{POST_DATE_FORMATTED}</time> • 
                       <span class="post-category">{POST_CATEGORY}</span>
                   </div>
                   <h1 class="post-title">{POST_TITLE}</h1>
               </header>

               <div class="post-content">
                   <!-- Post content here -->
               </div>
           </article>
       </main>

       <footer class="site-footer">
           <div class="container">
               <div class="footer-bottom">
                   <p>&copy; 2024 Roy's Blog. All rights reserved.</p>
               </div>
           </div>
       </footer>
   </body>
   </html>
   ```

   b. Create corresponding `meta.json` (see structure above)

3. **Category Management**
   - Check if post's category exists in `categories.json`
   - If new category needed:
     1. Add category to `categories.json`
     2. Push updated categories first
     3. Then create post using new category

4. **Featured Posts Management**
   - If post should be featured:
     1. Update `featured.json`
     2. Assign priority number (lower number = higher priority)
     3. Push updated featured configuration

## Required API Calls

1. **Create New Post**
```javascript
push_files({
  "repo": "xroybatty.github.io",
  "files": [
    {
      "path": "content/posts/2024-12-01-my-post-title/index.html",
      "content": "<post HTML content>"
    },
    {
      "path": "content/posts/2024-12-01-my-post-title/meta.json",
      "content": JSON.stringify({
        "id": "2024-12-01-my-post-title",
        "title": "My Post Title",
        "date": "2024-12-01",
        "category": "Technology",
        // ... other metadata
      }, null, 2)
    }
  ],
  "owner": "xroybatty",
  "branch": "main",
  "message": "Add new blog post: My Post Title"
});
```

2. **Add New Category** (if needed)
```javascript
push_files({
  "repo": "xroybatty.github.io",
  "files": [{
    "path": "content/categories/categories.json",
    "content": JSON.stringify({
      "categories": [
        // ... existing categories
        {
          "id": "new-category",
          "name": "New Category",
          "description": "Description",
          "slug": "new-category"
        }
      ]
    }, null, 2)
  }],
  "owner": "xroybatty",
  "branch": "main",
  "message": "Add new category: New Category"
});
```

3. **Update Featured Posts**
```javascript
push_files({
  "repo": "xroybatty.github.io",
  "files": [{
    "path": "content/featured/featured.json",
    "content": JSON.stringify({
      "featured_posts": [
        {
          "postId": "2024-12-01-my-post-title",
          "priority": 1
        }
        // ... other featured posts
      ]
    }, null, 2)
  }],
  "owner": "xroybatty",
  "branch": "main",
  "message": "Update featured posts list"
});
```

## Usage Flow Example

1. When creating a new post "My Technology Post":
   ```javascript
   // 1. First, check if category exists
   // 2. If not, create new category
   // 3. Create post directory with index.html and meta.json
   // 4. If featuring post, update featured.json
   // 5. Push all changes
   ```

## Important Notes

### Content Structure and Integrity
1. Never modify index.html directly
2. Maintain consistent header and footer across all posts
3. Always use proper semantic HTML
4. Follow existing CSS classes and styles
5. Keep featured.json sorted by date (newest first)
6. Ensure all HTML is properly formatted and validated
7. Use placeholder images with meaningful alt text
8. Include meta description for SEO
9. Follow the exact push_files structure shown above

## Asset Management
Post-specific assets (images, documents, etc.) should be stored in the post's assets directory:
- Path format: content/posts/YYYY-MM-DD-post-title-slug/assets/
- Reference assets using relative paths from the post's index.html
- Example: `<img src="./assets/diagram.png" alt="Architecture diagram">`

### Media and Rich Content Handling
1. Images and Graphics:
   - Use placeholder images with meaningful alt text for accessibility
   - Implement lazy loading for performance optimization
   - Include proper width and height attributes to prevent layout shifts
   - Support responsive image sets using srcset when appropriate
   - Optimize image formats (WebP with fallbacks)

2. Interactive Elements:
   - Ensure JavaScript dependencies are loaded from approved CDN sources
   - Implement proper initialization and error handling
   - Include fallback content for users with JavaScript disabled
   - Consider mobile interaction patterns

3. Code Snippets:
   - Use appropriate syntax highlighting with language specification
   - Implement copy-to-clipboard functionality
   - Ensure proper escaping of special characters
   - Maintain consistent formatting and indentation
   - Include line numbers for longer snippets

4. Diagrams and Visualizations:
   - Use appropriate libraries (Mermaid, D3.js, etc.) with version control
   - Provide text alternatives for screen readers
   - Ensure responsive behavior across devices
   - Include proper initialization and error handling

5. Mathematical Content:
   - Use MathJax or KaTeX for mathematical notation
   - Ensure proper formula formatting and escaping
   - Include plain text alternatives
   - Consider mobile rendering

6. Embedded Content:
   - Implement secure iframes with proper sandbox attributes
   - Handle responsive scaling for embedded content
   - Provide fallback content for failed embeds
   - Consider privacy implications and loading performance

### Special Content Types
1. Tables:
   - Use responsive table wrappers for mobile devices
   - Include proper header structure
   - Implement horizontal scrolling for wide tables
   - Provide appropriate ARIA labels

2. Quotes and Citations:
   - Use proper semantic markup for blockquotes
   - Include citation sources with proper formatting
   - Implement consistent styling for different quote types

3. Interactive Components:
   - Implement proper event handling
   - Ensure keyboard accessibility
   - Provide proper ARIA roles and states
   - Consider touch interface requirements

4. Audio and Video:
   - Use native HTML5 players when possible
   - Include proper fallbacks and formats
   - Implement transcripts for accessibility
   - Consider bandwidth and loading implications

### Technical Requirements
1. Dependencies:
   - Load all external resources from approved CDNs
   - Maintain dependency version control
   - Include integrity hashes for security
   - Consider loading performance impact

2. Cross-browser Compatibility:
   - Test across major browsers and versions
   - Implement appropriate polyfills
   - Provide graceful degradation
   - Consider progressive enhancement

3. Performance Optimization:
   - Implement proper resource loading strategies
   - Optimize asset delivery and caching
   - Consider code splitting when appropriate
   - Monitor and optimize page load metrics

4. Security Considerations:
   - Implement proper Content Security Policy
   - Sanitize user-generated content
   - Secure external resource loading
   - Protect against common vulnerabilities

### Documentation and Maintenance
1. Version Control:
   - Follow consistent commit message format
   - Maintain proper branch structure
   - Document significant changes
   - Follow the exact push_files structure shown above

2. Content Updates:
   - Implement proper content versioning
   - Maintain change logs when appropriate
   - Document content dependencies
   - Consider update implications

3. Accessibility Compliance:
   - Maintain WCAG 2.1 compliance
   - Include proper ARIA attributes
   - Ensure keyboard navigation
   - Provide text alternatives for non-text content

4. Mobile Responsiveness:
   - Test across device sizes
   - Implement proper breakpoints
   - Consider touch interfaces
