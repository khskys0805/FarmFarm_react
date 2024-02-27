package com.example.farmfarm_react.Repository;

import com.example.farmfarm_react.Entity.FileEntity;
import org.springframework.data.repository.CrudRepository;



public interface FileRepository extends CrudRepository<FileEntity, Integer> {
    FileEntity findByFileId(int fileId);
}
