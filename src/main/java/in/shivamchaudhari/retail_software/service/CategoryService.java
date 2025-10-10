package in.shivamchaudhari.retail_software.service;

import in.shivamchaudhari.retail_software.io.CategoryRequest;
import in.shivamchaudhari.retail_software.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file)throws IOException;
    List<CategoryResponse> read();
    void delete(String name);
}
