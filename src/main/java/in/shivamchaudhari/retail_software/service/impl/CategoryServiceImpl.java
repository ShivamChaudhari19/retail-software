package in.shivamchaudhari.retail_software.service.impl;


import in.shivamchaudhari.retail_software.entity.CategoryEntity;
import in.shivamchaudhari.retail_software.io.CategoryRequest;
import in.shivamchaudhari.retail_software.io.CategoryResponse;
import in.shivamchaudhari.retail_software.repository.CategoryRepository;
import in.shivamchaudhari.retail_software.service.CategoryService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public CategoryResponse add(CategoryRequest request) {

        CategoryEntity newEntity=convertToEntity(request);
        newEntity =categoryRepository.save(newEntity);
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

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColour(request.getBgColour())
                .build();
    }
}
