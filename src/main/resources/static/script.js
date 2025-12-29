// ===============================
// CONFIG
// ===============================
const API_URL = "http://localhost:8080/api/notes";

// ===============================
// DOM ELEMENTS (cached)
// ===============================
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");
const searchInput = document.getElementById("search");
const notesContainer = document.getElementById("notes");

let allNotes = [];
let editingNoteId = null;

// ===============================
// LOAD NOTES ON PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", loadNotes);

// ===============================
// FETCH ALL NOTES
// ===============================
async function loadNotes() {
    try {
        const res = await fetch(API_URL);
        allNotes = await res.json();
        renderNotes(allNotes);
    } catch (err) {
        console.error("Failed to load notes", err);
    }
}

// ===============================
// ADD OR UPDATE NOTE
// ===============================
async function addNote() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert("Title and content cannot be empty");
        return;
    }

    const noteData = { title, content };

    try {
        if (editingNoteId) {
            // UPDATE
            await fetch(`${API_URL}/${editingNoteId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(noteData),
            });
        } else {
            // CREATE
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(noteData),
            });
        }

        clearForm();
        await loadNotes();
    } catch (err) {
        console.error("Failed to save note", err);
    }
}

// ===============================
// DELETE NOTE
// ===============================
async function deleteNote(id) {
    if (!confirm("Delete this note?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        await loadNotes();
    } catch (err) {
        console.error("Failed to delete note", err);
    }
}

// ===============================
// EDIT NOTE
// ===============================
function editNote(note) {
    titleInput.value = note.title;
    contentInput.value = note.content;
    editingNoteId = note.id;
}

// ===============================
// CLEAR FORM
// ===============================
function clearForm() {
    titleInput.value = "";
    contentInput.value = "";
    editingNoteId = null;
}

// ===============================
// SEARCH NOTES
// ===============================
function searchNotes() {
    const query = searchInput.value.toLowerCase();

    const filtered = allNotes.filter(
        (n) =>
            n.title.toLowerCase().includes(query) ||
            n.content.toLowerCase().includes(query)
    );

    renderNotes(filtered);
}

// ===============================
// RENDER NOTES
// ===============================
function renderNotes(notes) {
    notesContainer.innerHTML = "";

    if (notes.length === 0) {
        notesContainer.innerHTML = `<p class="muted">No notes found</p>`;
        return;
    }

    notes.forEach((note) => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="note-actions">
        <button class="edit" onclick='editNote(${JSON.stringify(note)})'>✏️ Edit</button>
        <button class="delete" onclick="deleteNote(${note.id})">❌ Delete</button>
      </div>
    `;

        notesContainer.appendChild(div);
    });
}