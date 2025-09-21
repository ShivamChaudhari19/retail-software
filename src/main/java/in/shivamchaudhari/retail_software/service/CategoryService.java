package in.shivamchaudhari.retail_software.service;

import in.shivamchaudhari.retail_software.io.CategoryRequest;
import in.shivamchaudhari.retail_software.io.CategoryResponse;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request);

}
