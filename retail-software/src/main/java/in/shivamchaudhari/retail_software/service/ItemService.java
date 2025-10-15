package in.shivamchaudhari.retail_software.service;

import in.shivamchaudhari.retail_software.io.ItemRequest;
import in.shivamchaudhari.retail_software.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {
    ItemResponse add(ItemRequest itemRequest, MultipartFile file)throws IOException;
    List<ItemResponse> fetch();
    void deleteItem(String itemId);
}
