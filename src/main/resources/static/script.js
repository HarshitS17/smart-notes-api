const API_URL = "http://localhost:8080/api/notes";

let allNotes = [];
let editingNoteId = null;

/* =========================
   LOAD NOTES (ON PAGE LOAD)
   ========================= */
async function loadNotes() {
    const res = await fetch(API_URL);
    allNotes = await res.json();
    renderNotes(allNotes);
}

/* =========================
   RENDER NOTES
   ========================= */
function renderNotes(notes) {
    const container = document.getElementById("notes");
    container.innerHTML = "";

    if (notes.length === 0) {
        container.innerHTML = "<p>No notes yet.</p>";
        return;
    }

    notes.forEach(note => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="note-actions">
        <button class="edit" onclick="editNote(${note.id})">✏️ Edit</button>
        <button class="delete" onclick="deleteNote(${note.id})">❌ Delete</button>
      </div>
    `;

        container.appendChild(div);
    });
}

/* =========================
   ADD / UPDATE NOTE
   ========================= */
async function addNote() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Title and content cannot be empty");
        return;
    }

    const note = { title, content };

    if (editingNoteId === null) {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note)
        });
    } else {
        await fetch(`${API_URL}/${editingNoteId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(note)
        });

        editingNoteId = null;
        document.querySelector(".primary").innerText = "Add Note";
    }

    clearForm();
    await loadNotes();
}

/* =========================
   EDIT NOTE
   ========================= */
function editNote(id) {
    const note = allNotes.find(n => n.id === id);
    if (!note) return;

    document.getElementById("title").value = note.title;
    document.getElementById("content").value = note.content;

    editingNoteId = id;
    document.querySelector(".primary").innerText = "Update Note";
}

/* =========================
   DELETE NOTE
   ========================= */
async function deleteNote(id) {
    if (!confirm("Delete this note?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await loadNotes();
}

/* =========================
   CLEAR FORM
   ========================= */
function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    editingNoteId = null;
    document.querySelector(".primary").innerText = "Add Note";
}

/* =========================
   SEARCH NOTES
   ========================= */
function searchNotes() {
    const q = document.getElementById("search").value.toLowerCase();
    const filtered = allNotes.filter(
        n =>
            n.title.toLowerCase().includes(q) ||
            n.content.toLowerCase().includes(q)
    );
    renderNotes(filtered);
}

/* =========================
   INIT
   ========================= */
loadNotes();