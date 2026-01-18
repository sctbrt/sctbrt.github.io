# Setup Instructions

## Notion Integration Setup

### 1. Create Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "+ New integration"
3. Name it "Field Notes API" (or whatever you prefer)
4. Select your workspace
5. Click "Submit"
6. Copy the "Internal Integration Token" (starts with `secret_`)

### 2. Share Notion Database with Integration

1. Open your Field Notes database in Notion: https://lilac-stocking-b2d.notion.site/2ea3c4a766e480b7a46ed6bb8d6cde82
2. Click the "..." menu in the top right
3. Scroll to "Connections" or "Add connections"
4. Find and select your "Field Notes API" integration
5. Click "Confirm"

### 3. Configure Notion Database Properties

Your Notion database should have these properties:
- **Name** (Title) - The title of the note
- **Category** (Select) - Options: Note, Photo drop, Micro case, Standard, etc.
- **Content** (Rich Text) - The main content/quote
- **Image** (Files & media) - Optional image for the note

### 4. Set up Vercel Environment Variable

1. In your Vercel dashboard, go to your project settings
2. Navigate to "Environment Variables"
3. Add a new variable:
   - **Name**: `NOTION_API_KEY`
   - **Value**: Your Notion integration token (from step 1)
   - **Environment**: Production, Preview, Development (select all)
4. Click "Save"

### 5. Deploy to Vercel

Your site will automatically fetch the latest 8 field notes from Notion when visitors load the page.

## Formspree Setup

1. Go to [Formspree.io](https://formspree.io)
2. Sign up for a free account
3. Create a new form
4. Copy the form endpoint URL
5. Update `index.html` line 421 - replace `YOUR_FORM_ID` with your Formspree form ID

Example: Change
```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```
to
```html
<form class="contact-form" action="https://formspree.io/f/xyzabc123" method="POST">
```

## Assets to Create

You still need to create these image assets in the `assets/images/` folder:

1. **favicon.svg** - SVG version of your logo (simple, monochrome works best)
2. **favicon.png** - PNG version (32x32px or 64x64px)
3. **og-image.png** - Social media preview image (1200x630px recommended)

## Local Testing

To test the Notion integration locally:

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel dev` in your project directory
3. Create a `.env` file with: `NOTION_API_KEY=your_secret_token_here`
4. Open `http://localhost:3000`

## Deployment

Push to GitHub and Vercel will automatically deploy, or run:
```bash
vercel --prod
```
