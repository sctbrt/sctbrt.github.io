// Vercel Serverless Function to fetch Notion Field Notes
// This will be called from the frontend to get latest notes

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = '2ea3c4a766e480b7a46ed6bb8d6cde82';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const response = await fetch(
      `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_size: 8,
          sorts: [
            {
              timestamp: 'created_time',
              direction: 'descending'
            }
          ]
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform Notion data to simplified format
    const notes = data.results.map(page => {
      const properties = page.properties;

      return {
        id: page.id,
        title: properties.Name?.title?.[0]?.plain_text || 'Untitled',
        category: properties.Category?.select?.name || 'Note',
        content: properties.Content?.rich_text?.[0]?.plain_text || '',
        image: properties.Image?.files?.[0]?.file?.url || properties.Image?.files?.[0]?.external?.url || null,
        createdTime: page.created_time
      };
    });

    res.status(200).json({ notes });
  } catch (error) {
    console.error('Error fetching from Notion:', error);
    res.status(500).json({
      error: 'Failed to fetch field notes',
      message: error.message
    });
  }
}
