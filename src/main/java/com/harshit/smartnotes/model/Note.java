package com.harshit.smartnotes.model;

//  (used to map Java class to database table)
import jakarta.persistence.*;
/*
 * @Entity
 * Marks this class as a JPA entity.
 * This means Hibernate will create a database table for this class.
 */
@Entity

/*
 * @Table
 * Specifies the table name in the database.
 * If not given, table name = class name (Note).
 */
@Table(name = "notes")
public class Note {

    //Marks this field as the PRIMARY KEY of the table.
    @Id
    /*
     * @GeneratedValue
     * Tells the database to auto-generate this value.
     * IDENTITY = auto-increment (1, 2, 3, ...)
     */
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /*
     * Title of the note.
     * By default, String → VARCHAR(255)
     */
    private String title;

    /**
     * Content/body of the note.
     * length = 1000 increases column size from default 255.
     */
    @Column(length = 1000)
    private String content;

    // ---------------- GETTERS & SETTERS ----------------

    /**
     * Getter for id
     * Used by Spring/JPA to read the value
     */
    public Long getId() {
        return id;
    }

    /*
     * Setter for id
     * Usually set automatically by JPA, not by us
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Getter for title
     */
    public String getTitle() {
        return title;
    }

    /**
     * Setter for title
     */
    public void setTitle(String title) {
        this.title = title;
    }

    /**
     * Getter for content
     */
    public String getContent() {
        return content;
    }

    /**
     * Setter for content
     */
    public void setContent(String content) {
        this.content = content;
    }
}