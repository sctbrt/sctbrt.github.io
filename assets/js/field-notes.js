// Field Notes - Dynamic Notion Integration
// Fetches and displays latest field notes from Notion

async function loadFieldNotes() {
  const container = document.getElementById('field-notes-cards');

  if (!container) return;

  // Show loading state
  container.innerHTML = `
    <div class="card" style="grid-column: span 12; text-align: center;">
      <p style="color: var(--muted);">Loading field notes...</p>
    </div>
  `;

  try {
    const response = await fetch('/api/field-notes');

    if (!response.ok) {
      throw new Error('Failed to load field notes');
    }

    const data = await response.json();
    const notes = data.notes;

    if (!notes || notes.length === 0) {
      container.innerHTML = `
        <div class="card" style="grid-column: span 12;">
          <p>No field notes yet. Check back soon.</p>
        </div>
      `;
      return;
    }

    // Clear loading state
    container.innerHTML = '';

    // Render each note as a card
    notes.forEach(note => {
      const card = document.createElement('div');
      card.className = 'card field-note-card';

      let cardContent = `<small>${note.category}</small>`;

      // Add image if available
      if (note.image) {
        cardContent += `
          <div class="field-note-image">
            <img src="${note.image}" alt="${note.title}" loading="lazy">
          </div>
        `;
      }

      // Add title if not "Untitled"
      if (note.title && note.title !== 'Untitled') {
        cardContent += `<p><strong>${note.title}</strong></p>`;
      }

      // Add content
      if (note.content) {
        const isQuote = note.category.toLowerCase() === 'note' || note.content.startsWith('"');
        cardContent += `<p>${isQuote && !note.content.startsWith('"') ? '"' + note.content + '"' : note.content}</p>`;
      }

      card.innerHTML = cardContent;
      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error loading field notes:', error);
    container.innerHTML = `
      <div class="card" style="grid-column: span 12;">
        <p style="color: var(--muted);">Unable to load field notes. Please try again later.</p>
      </div>
    `;
  }
}

// Load field notes when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadFieldNotes);
} else {
  loadFieldNotes();
}
