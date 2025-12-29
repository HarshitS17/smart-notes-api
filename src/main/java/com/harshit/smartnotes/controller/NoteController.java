package com.harshit.smartnotes.controller;

import com.harshit.smartnotes.model.Note;
import com.harshit.smartnotes.service.NoteService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

// It handles HTTP requests and returns HTTP responses ((JSON in/out)
@RestController
@RequestMapping("/api/notes") // base URL for all endpoints
public class NoteController {

    private final NoteService noteService;
    // Constructor injection : Spring injects NoteService automatically
    public NoteController(NoteService noteService){
        this.noteService = noteService;
    }

    // creating a new node
    @PostMapping
    public  Note createNote(@RequestBody Note note){
    return noteService.saveNote(note);
    }

    //Get all notes
    //GET /api/notes
    @GetMapping
    public List<Note> getAllNote(){
            return noteService.getAllNotes();
    }

    // Get note by id
    //GET /api/notes/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable Long id) {

        Optional<Note> note = noteService.getNoteById(id);

        // If note exists → 200 OK
        // If not → 404 NOT FOUND
        return note
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    //update note by id
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(
        @PathVariable Long id , //Extracts id from URL
        @RequestBody Note updatedNote//Takes updated data from request body (JSON)
    ){
        //Fetching note from DB
        Optional <Note> existingNote = noteService.getNoteById(id);//Wrapped in Optional to handle “not found”


        //if note not found
        if (existingNote.isEmpty()) { //Prevents updating non-existent data
            return ResponseEntity.notFound().build();
        }

        //now updating new note
        Note note = existingNote.get();
        //Copies new values into existing entity
        note.setTitle(updatedNote.getTitle());
        note.setContent(updatedNote.getContent());

        return ResponseEntity.ok(noteService.saveNote(note));
    }

    // delete note  by id

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {

        Optional<Note> note = noteService.getNoteById(id);

        if (note.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        noteService.deleteNote(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

}
