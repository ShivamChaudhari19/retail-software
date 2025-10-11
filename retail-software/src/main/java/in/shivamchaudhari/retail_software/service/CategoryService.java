package in.shivamchaudhari.retail_software.service;

import in.shivamchaudhari.retail_software.io.RequestCategory;
import in.shivamchaudhari.retail_software.io.ResponseCategory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {
    ResponseCategory addCategory(RequestCategory request, MultipartFile file) throws IOException;
    List<ResponseCategory> read();
    void delete(String categoryId);
}
