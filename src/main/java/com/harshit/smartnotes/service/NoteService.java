package com.harshit.smartnotes.service;

import com.harshit.smartnotes.model.Note;
import com.harshit.smartnotes.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    // Repository dependency
    private final NoteRepository noteRepository;

    // Constructor Injection
    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    // Create or Update a note
    public Note saveNote(Note note) {
        return noteRepository.save(note);
    }

    // Get all notes
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    // Get note by ID
    public Optional<Note> getNoteById(Long id) {
        return noteRepository.findById(id);
    }

    // Delete note by ID
    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }
}