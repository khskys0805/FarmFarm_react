package com.example.farmfarm_react.Service;

import com.example.farmfarm_react.Entity.FileEntity;
import com.example.farmfarm_react.Repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class FileService {
    @Autowired
    FileRepository fileRepository;

    public FileEntity save(FileEntity files) {
        fileRepository.save(files);
        return files;
    }
    public FileEntity findByFileId(int id) {
        return fileRepository.findByFileId(id);
    }
}

