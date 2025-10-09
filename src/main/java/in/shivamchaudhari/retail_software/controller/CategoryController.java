package in.shivamchaudhari.retail_software.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.shivamchaudhari.retail_software.io.CategoryRequest;
import in.shivamchaudhari.retail_software.io.CategoryResponse;
import in.shivamchaudhari.retail_software.service.CategoryService;
import in.shivamchaudhari.retail_software.service.impl.CategoryServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(@RequestPart("category") String categoryString,
                                        @RequestPart("file") MultipartFile file) throws IOException {
        ObjectMapper objectMapper=new ObjectMapper();
//        This helped me to debug for Constructor related debug
//         CategoryRequest request=new CategoryRequest("mouse","none","none");

        CategoryRequest request=null;

        try {
             request=objectMapper.readValue(categoryString,CategoryRequest.class);
            return categoryService.add(request,file);
        }catch (JsonProcessingException e){
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST, "Exception occurred while parsing json");
        }

    }

    @GetMapping
    public List<CategoryResponse> fetchCategory(){
        return categoryService.read();
    }

    @DeleteMapping("/{categoryId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteCategory(@PathVariable String categoryId){
        try{
            categoryService.delete(categoryId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,e.getMessage());
        }
    }
}
