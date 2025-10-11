package in.shivamchaudhari.retail_software.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import in.shivamchaudhari.retail_software.io.RequestCategory;
import in.shivamchaudhari.retail_software.io.ResponseCategory;
import in.shivamchaudhari.retail_software.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/categories")

@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseCategory addCategory(@RequestPart String categoryRequest,
                                        @RequestPart MultipartFile file){
        if(file.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"File Not Found!!");
        }
        RequestCategory request=null;
        try {
             ObjectMapper objectMapper=new ObjectMapper();
             request=objectMapper.readValue(categoryRequest, RequestCategory.class);
            return categoryService.addCategory(request,file);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GetMapping
    public List<ResponseCategory> fetchCategory(){
        return categoryService.read();
    }

    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable String categoryId){
            try{
                categoryService.delete(categoryId);
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND,e.getMessage());
            }
    }

}

