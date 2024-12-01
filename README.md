# Roy's Blog

Personal blog exploring technology, culture, and various interests through thoughtful analysis and discussion.

## Adding New Blog Posts

1. Create a new directory in `content/posts` using the format `YYYY-MM-DD-post-title`

2. Inside the new directory, create two files:
   - `meta.json`: Contains post metadata
   - `index.html`: Contains the actual post content

### Example meta.json structure:
```json
{
  "id": "YYYY-MM-DD-post-title",
  "title": "Your Post Title",
  "category": "tech|culture",
  "date": "YYYY-MM-DD",
  "excerpt": "A brief excerpt from your post...",
  "image": "/api/placeholder/800/400",
  "image_alt": "Description of the image"
}
```

3. Run the build process to update featured.json:
```bash
npm run build
```

This will automatically:
- Generate an updated featured.json file
- Sort posts by date (newest first)
- Update the last_updated timestamp

## Development

The blog uses a simple static site structure with the following key components:

- `/content/posts/`: Individual blog post directories
- `/content/featured/`: Generated featured posts list
- `/assets/`: CSS and JavaScript files
- `/scripts/`: Build scripts

## Build Process

The build process is managed through npm scripts:

```bash
npm run build        # Runs all build processes
npm run build:featured # Updates only the featured.json file
```

## Adding Categories

To add a new category:
1. Add it to the categories.json file
2. Use the category name in your post's meta.json
3. Rebuild the featured.json file

## File Structure

```
xroybatty.github.io/
├── content/
│   ├── posts/
│   │   └── YYYY-MM-DD-post-title/
│   │       ├── meta.json
│   │       └── index.html
│   └── featured/
│       └── featured.json
├── assets/
│   ├── css/
│   └── js/
├── scripts/
│   └── build-featured.js
└── package.json
```