package in.shivamchaudhari.retail_software.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.shivamchaudhari.retail_software.io.CategoryRequest;
import in.shivamchaudhari.retail_software.io.CategoryResponse;
import in.shivamchaudhari.retail_software.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping

@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping("/admin/categories")
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart String categoryRequest,
                                        @RequestPart MultipartFile file){
        if(file.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"File Not Found!!");
        }
        CategoryRequest request=null;
        try {
             ObjectMapper objectMapper=new ObjectMapper();
             request=objectMapper.readValue(categoryRequest, CategoryRequest.class);
            return categoryService.addCategory(request,file);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping("category")
    public List<CategoryResponse> fetchCategory(){
        return categoryService.read();
    }

    @DeleteMapping("/admin/categories/{categoryId}")
    public void deleteCategory(@PathVariable String categoryId){
            try{
                categoryService.delete(categoryId);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,e.getMessage());
            }
    }

}

