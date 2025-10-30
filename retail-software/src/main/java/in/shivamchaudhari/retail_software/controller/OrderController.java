package in.shivamchaudhari.retail_software.controller;

import in.shivamchaudhari.retail_software.io.OrderRequest;
import in.shivamchaudhari.retail_software.io.OrderResponse;
import in.shivamchaudhari.retail_software.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest orderRequest){
       return orderService.createOrder(orderRequest);
    }

    @GetMapping("/latest")
    @ResponseStatus(HttpStatus.OK)
    public List<OrderResponse> getOrders(){
        return orderService.getLatestOrder();
    }

    @DeleteMapping("/{orderId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOrder(@PathVariable String orderId)
    {
        orderService.deleteOrder(orderId);
    }
}
