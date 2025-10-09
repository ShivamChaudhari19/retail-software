package in.shivamchaudhari.retail_software.service;

import in.shivamchaudhari.retail_software.io.CategoryRequest;
import in.shivamchaudhari.retail_software.io.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request);
    List<CategoryResponse> read();
    void delete(String name);
}
