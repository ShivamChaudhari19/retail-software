package in.shivamchaudhari.retail_software.service.impl;

import in.shivamchaudhari.retail_software.service.FileUploadService;
import org.springframework.web.multipart.MultipartFile;


import java.util.UUID;

public class FileUploadServiceImpl implements FileUploadService {
    @Override
    public String uploadFile(MultipartFile file) {
        String fileNameExtension=file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String key= UUID.randomUUID().toString()+"."+fileNameExtension; //each image name should be unique



        return "";
    }

    @Override
    public boolean deleteFile(String imgUrl) {
        return false;
    }
}
