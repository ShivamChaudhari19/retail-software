package in.shivamchaudhari.retail_software.service.impl;

import in.shivamchaudhari.retail_software.entity.CategoryEntity;
import in.shivamchaudhari.retail_software.io.CategoryRequest;
import in.shivamchaudhari.retail_software.io.CategoryResponse;
import in.shivamchaudhari.retail_software.repository.CategoryRepository;
import in.shivamchaudhari.retail_software.service.CategoryService;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Data
//@RequiredArgsConstructor
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService  {

    private final CategoryRepository categoryRepository;
    @Override
    public CategoryResponse addCategory(CategoryRequest request, MultipartFile file) throws IOException {

        String fileNameExtension=file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String fileName= UUID.randomUUID().toString()+"."+fileNameExtension;
        Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path targetLocation = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(),targetLocation, StandardCopyOption.REPLACE_EXISTING);
        String imgUrl = "http://localhost:8080/api/v1.0/uploads/" + fileName;

        CategoryEntity newEntity =convertToEntity(request,imgUrl);
        newEntity=categoryRepository.save(newEntity);
       return convertToResponse(newEntity);
    }

    private CategoryResponse convertToResponse(CategoryEntity newEntity) {
        return CategoryResponse.builder()
                .categoryId(newEntity.getCategoryId())
                .name(newEntity.getName())
                .description(newEntity.getDescription())
                .bgColour(newEntity.getBgColour())
                .imgUrl(newEntity.getImgUrl())
                .createdAt(newEntity.getCreatedAt())
                .updatedAt(newEntity.getUpdatedAt())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request, String imgUrl) {
        return CategoryEntity.builder()
                .name(request.getName())
                .bgColour(request.getBgColour())
                .description(request.getDescription())
                .imgUrl(imgUrl)
                .build();
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
            CategoryEntity existingCategory=categoryRepository.findByCategoryId(categoryId).orElseThrow(()->new RuntimeException("Category not found!!"+categoryId));
            categoryRepository.deleteById(existingCategory.getId());
    }
}
