package in.shivamchaudhari.retail_software.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import in.shivamchaudhari.retail_software.io.ItemRequest;
import in.shivamchaudhari.retail_software.io.ItemResponse;
import in.shivamchaudhari.retail_software.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ItemController {
    private final ItemService itemService;

    @PostMapping("/admin/items")
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse addItem(@RequestPart("itemRequest") String itemRequest,
                                @RequestPart("file") MultipartFile file)
            throws IOException
    {
        if(file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "file not uploaded");
        }

        try {
        ObjectMapper objectMapper=new ObjectMapper();
        ItemRequest request=objectMapper.readValue(itemRequest,ItemRequest.class);
        return  itemService.add(request,file);

        }catch (JsonProcessingException e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"error occoured while processing the json");
        }
    }

    @GetMapping("/items")
    public List<ItemResponse> getItems()
    {
        return itemService.fetch();
    }

    @DeleteMapping("/admin/items/{itemId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteItem(@PathVariable String itemId)
    {
        try {
        itemService.deleteItem(itemId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Item not Deleted or Item not Found");
        }
    }

}
