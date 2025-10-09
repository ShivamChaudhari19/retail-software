package in.shivamchaudhari.retail_software.service.impl;


import in.shivamchaudhari.retail_software.entity.CategoryEntity;
import in.shivamchaudhari.retail_software.io.CategoryRequest;
import in.shivamchaudhari.retail_software.io.CategoryResponse;
import in.shivamchaudhari.retail_software.repository.CategoryRepository;
import in.shivamchaudhari.retail_software.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) throws IOException {
        if(file.isEmpty()){
            throw  new RuntimeException("file can't save");
        }

            String fileName = UUID.randomUUID().toString() + "." + StringUtils.getFilenameExtension(file.getOriginalFilename());
            Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);
            Path targetLocation = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            String imgUrl = "http://localhost:8080/api/v1.0/uploads/" + fileName;

            CategoryEntity newEntity = convertToEntity(request, imgUrl);
            newEntity = categoryRepository.save(newEntity);
            return convertToResponse(newEntity);

    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void delete(String categoryId) {
       CategoryEntity existingEntity=categoryRepository.findByCategoryId(categoryId).orElseThrow(()->new RuntimeException("category not found"+categoryId));
       categoryRepository.deleteById(existingEntity.getId());
    }

    private CategoryResponse convertToResponse(CategoryEntity newEntity) {
        return CategoryResponse.builder()
                .categoryId(newEntity.getCategoryId())
                .name(newEntity.getName())
                .description(newEntity.getDescription())
                .bgColour(newEntity.getBgColour())
                .imgUrl(newEntity.getImgUrl())
                .createAt(newEntity.getCreateAt())
                .updatedAt(newEntity.getUpdatedAt())
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request,String imgUrl) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColour(request.getBgColour())
                .imgUrl(imgUrl)
                .build();
    }
}
