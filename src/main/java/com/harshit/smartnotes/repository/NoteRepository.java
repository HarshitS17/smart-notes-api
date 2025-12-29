package com.harshit.smartnotes.repository;

import com.harshit.smartnotes.model.Note;
import org.springframework.data.jpa.repository.JpaRepository;
//This is Dependency Injection + Abstraction in action.

/*
 * NoteRepository
 *
 * This interface is responsible for all database operations
 * related to the Note entity.
 *
 * IMPORTANT:
 * - We do NOT write SQL
 * - We do NOT write implementation code
 * - Spring Data JPA generates everything automatically
 */
public interface NoteRepository extends JpaRepository<Note, Long> {

    /*
     * JpaRepository provides ready-made methods like:
     *
     * save(Note note)            -> INSERT / UPDATE
     * findById(Long id)           -> SELECT by ID
     * findAll()                   -> SELECT all rows
     * deleteById(Long id)         -> DELETE by ID
     * count()                     -> COUNT rows
     *
     * You don't see them here,
     * but they EXIST at runtime.
     */
}