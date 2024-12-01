# Blog Post Creation Instructions

This document provides the complete workflow for creating and publishing blog posts on xroybatty.github.io.

## Repository Structure

```
xroybatty.github.io/
├── index.html                 # Dynamic loader template (DO NOT MODIFY)
├── assets/
│   ├── css/
│   │   └── style.css         # Global styles
│   └── js/
│       ├── blogLoader.js      # Handles post loading
│       └── navigation.js      # Manages navigation
├── content/
│   ├── posts/                # Individual post HTML files
│   ├── categories/           
│   │   └── categories.json    # Category definitions
│   └── featured/             
│       └── featured.json      # Featured posts list
└── templates/
    └── post.html             # Post template
```

## Post Creation Process

1. Generate post HTML file:
   - Use the following template structure for all posts:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>{POST_TITLE} - Roy's Blog</title>
       <link href="/assets/css/style.css" rel="stylesheet">
       <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
   </head>
   <body>
       <!-- Header section - must match index.html -->
       <header class="site-header">...</header>

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

       <!-- Footer section - must match index.html -->
       <footer class="site-footer">...</footer>
   </body>
   </html>
   ```

2. Update featured.json:
   ```json
   {
     "featured_posts": [
       {
         "id": "{POST_FILE_NAME}",
         "title": "{POST_TITLE}",
         "category": "{CATEGORY}",
         "date": "{POST_DATE}",
         "excerpt": "{POST_EXCERPT}",
         "image": "/api/placeholder/800/400",
         "image_alt": "{IMAGE_DESCRIPTION}"
       }
     ]
   }
   ```

3. File naming convention:
   - Format: YYYY-MM-DD-post-title-slug.html
   - Example: 2024-12-01-anthropic-model-context-protocol.html

4. Category handling:
   - If using existing category: Use category from categories.json
   - If new category needed: Add to categories.json first

## Required API Calls

1. Create new post:
```javascript
push_files({
  "repo": "xroybatty.github.io",
  "files": [{
    "path": "posts/YYYY-MM-DD-post-title.html",
    "content": "<post HTML content>"
  }],
  "owner": "xroybatty",
  "branch": "main",
  "message": "Add blog post about <topic>"
});
```

2. Update featured posts:
```javascript
push_files({
  "repo": "xroybatty.github.io",
  "files": [{
    "path": "content/featured/featured.json",
    "content": "<updated featured.json content>"
  }],
  "owner": "xroybatty",
  "branch": "main",
  "message": "Update featured posts list"
});
```

3. Add new category (if needed):
```javascript
push_files({
  "repo": "xroybatty.github.io",
  "files": [{
    "path": "content/categories/categories.json",
    "content": "<updated categories.json content>"
  }],
  "owner": "xroybatty",
  "branch": "main",
  "message": "Add new category"
});
```

## Important Notes

1. Never modify index.html directly
2. Maintain consistent header and footer across all posts
3. Always use proper semantic HTML
4. Follow existing CSS classes and styles
5. Keep featured.json sorted by date (newest first)
6. Ensure all HTML is properly formatted and validated
7. Use placeholder images with meaningful alt text
8. Include meta description for SEO
9. Follow the exact push_files structure shown above
