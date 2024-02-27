package com.example.farmfarm_react.Controller;

import com.example.farmfarm_react.Entity.FileEntity;
import com.example.farmfarm_react.Service.FileService;
import com.example.farmfarm_react.Service.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class S3Controller {
    private final S3Service S3Service;
    @Autowired
    FileService fileService;
    @PostMapping("/file")
    public ResponseEntity<FileEntity> uploadFile(@RequestPart MultipartFile multipartFile) {
        System.out.println("file 요청");
        try {
            String filename = S3Service.uploadFile(multipartFile);
            String url = S3Service.getUrl(filename);
            FileEntity files = new FileEntity(filename, url);
            FileEntity newfile = fileService.save(files);
            return ResponseEntity.ok().body(newfile);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
    @DeleteMapping("/file/{fileIdx}")
    public ResponseEntity<String> deleteFile(@PathVariable("fileIdx") int fileIdx) {
        try {
            FileEntity file = fileService.findByFileId(fileIdx);
            S3Service.deleteFile(file.getFilename());
            return ResponseEntity.ok().body("삭제 처리가 완료되었습니다.");
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
    @GetMapping("/file")
    public ResponseEntity<String> getFile(@RequestParam String fileName) {

        String url = S3Service.getUrl(fileName).toString();

        return ResponseEntity.ok().body(url);
    }
}

