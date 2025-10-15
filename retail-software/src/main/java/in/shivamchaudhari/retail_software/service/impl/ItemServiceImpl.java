package in.shivamchaudhari.retail_software.service.impl;

import in.shivamchaudhari.retail_software.entity.CategoryEntity;
import in.shivamchaudhari.retail_software.entity.ItemEntity;
import in.shivamchaudhari.retail_software.io.ItemRequest;
import in.shivamchaudhari.retail_software.io.ItemResponse;
import in.shivamchaudhari.retail_software.repository.CategoryRepository;
import in.shivamchaudhari.retail_software.repository.ItemRepository;
import in.shivamchaudhari.retail_software.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
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
public class ItemServiceImpl implements ItemService {
    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public ItemResponse add(ItemRequest itemRequest, MultipartFile file) throws IOException {

        String fileExtension=file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".")+1);
        String fileName= UUID.randomUUID().toString()+"."+fileExtension;
        Path uploadPath = Paths.get("uploads").toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);
        Path targetLocation= uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(),targetLocation, StandardCopyOption.REPLACE_EXISTING);
        String imgUrl="http://localhost:8080/api/v1.0/uploads/" + fileName;
        ItemEntity newItemEntity=toItemEntity(itemRequest,imgUrl);
        ItemEntity itemEntity=itemRepository.save(newItemEntity);
        return toItemResponse(newItemEntity);
    }

    private ItemResponse toItemResponse(ItemEntity newItemEntity) {
        return ItemResponse.builder()
                .itemId(newItemEntity.getItemId())
                .name(newItemEntity.getName())
                .price(newItemEntity.getPrise())
                .description(newItemEntity.getDescription())
                .createdAt(newItemEntity.getCreatedAt())
                .updatedAt(newItemEntity.getUpdatedAt())
                .categoryId(newItemEntity.getCategory().getCategoryId())
                .categoryName(newItemEntity.getCategory().getName())
                .imgUrl(newItemEntity.getImgUrl())
                .build();
    }

    private ItemEntity toItemEntity(ItemRequest itemRequest,String imgUrl) {
        CategoryEntity ItemCategory=categoryRepository.findByCategoryId(itemRequest.getCategoryId())
                .orElseThrow(()->(new RuntimeException("Category not Found for CategoryId:"+itemRequest.getCategoryId())));

        return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(itemRequest.getName())
                .description(itemRequest.getDescription())
                .imgUrl(imgUrl)
                .category(ItemCategory)
                .prise(itemRequest.getPrice())
                .build();
    }

    @Override
    public List<ItemResponse> fetch() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity->toItemResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteItem(String itemId) {
        ItemEntity existingEntity=itemRepository.findByItemId(itemId)
                .orElseThrow(()->new RuntimeException("Item not Found with Item Id: "+itemId));
        itemRepository.deleteById(existingEntity.getId());
    }
}
