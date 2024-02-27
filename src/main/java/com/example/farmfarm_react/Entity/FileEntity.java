package com.example.farmfarm_react.Entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@Data
@Entity
@Table(name="files")
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="file_id")
    private int fileId;

    @Column(name="filename")
    private String filename;


    @Column(name="fileurl")
    private String fileurl;

    public FileEntity(String filename, String fileurl) {
        this.filename = filename;
        this.fileurl = fileurl;
    }
}
