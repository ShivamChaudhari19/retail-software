package in.shivamchaudhari.retail_software.service.impl;

import com.razorpay.RazorpayException;
import com.razorpay.Utils;
import in.shivamchaudhari.retail_software.entity.OrderEntity;
import in.shivamchaudhari.retail_software.entity.OrderItemEntity;
import in.shivamchaudhari.retail_software.io.*;
import in.shivamchaudhari.retail_software.repository.OrderEntityRepository;
import in.shivamchaudhari.retail_software.service.OrderService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

<<<<<<< HEAD
    //fixme: String value of my.secret.key not injecting while building of the project
    @Value("${razorpay.key.secret}")
    private String secret;
=======
    // @Value("${my-secret-key}")    wrong

    // correct
    @Value("${jwt.secret.key}")
    private final String secret="mysecretkeyfortheapplication789387&(";
>>>>>>> e3337bcb84854b5cf67b12fe397c32761fb25428
    private final OrderEntityRepository orderEntityRepository;
    @Override
    public OrderResponse createOrder(OrderRequest request) {

        OrderEntity newOrder=convertToOrderEntity(request);

        PaymentDetails paymentDetails=new PaymentDetails();
        paymentDetails.setStatus(newOrder.getPaymentMethod()== PaymentMethod.CASH?
                PaymentDetails.PaymentStatus.COMPLETED: PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);

        List<OrderItemEntity> orderItem=request.getCartItems().stream()
                .map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItem);


        return convertToOrderResponse(
                orderEntityRepository.save(newOrder)
        );
    }

    private OrderResponse convertToOrderResponse(OrderEntity save) {
        return OrderResponse.builder()
                .orderId(save.getOrderId())
                .customerName(save.getCustomerName())
                .phoneNumber(save.getPhoneNumber())
                .subtotal(save.getSubtotal())
                .tax(save.getTax())
                .grandTotal(save.getGrandTotal())
                .paymentDetails(save.getPaymentDetails())
                .paymentMethod(save.getPaymentMethod())
                .createdAt(save.getCreatedAt())
                .items(save.getItems().stream()
                        .map(this::convertToItemResponse)
                        .collect(Collectors.toList()))
                .build();
    }

    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity) {
        return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .name(orderItemEntity.getName())
                .price(orderItemEntity.getPrice())
                .quantity(orderItemEntity.getQuantity())
                .build();
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {
        return OrderItemEntity.builder()
                .itemId(orderItemRequest.getItemId())
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private OrderEntity convertToOrderEntity(OrderRequest request) {
        return OrderEntity.builder()
                .orderId(UUID.randomUUID().toString())
                .customerName(request.getCustomerName())
                .tax(request.getTax())
                .subtotal(request.getSubtotal())
                .phoneNumber(request.getPhoneNumber())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingEntity=orderEntityRepository.findByOrderId(orderId)
                .orElseThrow(()->new RuntimeException("order not found: "+orderId));
        orderEntityRepository.deleteById(existingEntity.getId());
    }

    @Override
    public List<OrderResponse> getLatestOrder() {
        List<OrderEntity> orderEntities=orderEntityRepository.findAllByOrderByCreatedAtDesc();
        return orderEntities.stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
        OrderEntity existingOrder=orderEntityRepository.findByOrderId(request.getOrderId()).orElseThrow(()->new RuntimeException("order not found: "+request.getOrderId()));

        // TODO: security check — make sure Razorpay orderId matches the one stored in DB
//        if(!existingOrder.getPaymentDetails().getRazorpayOrderId().equals(request.getRazorpayOrderId()))
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"invalid razorpay order id reference");
        if(!verifyRazorpaySignature(request.getRazorpayOrderId(),
                request.getRazorpayPaymentId(),
                request.getRazorpaySignature())
        )
        {
            throw new RuntimeException("payment verification failed!!!");
        }
        PaymentDetails paymentDetails=existingOrder.getPaymentDetails();
        paymentDetails.setRazorpayPaymentId(request.getRazorpayPaymentId());
        paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
        paymentDetails.setRazorpaySignature(request.getRazorpaySignature());
        paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);
//        existingOrder.setPaymentDetails(paymentDetails);
        existingOrder=orderEntityRepository.save(existingOrder);
        return convertToOrderResponse(existingOrder);
    }

    @Override
    public Double sumSalesByDate(LocalDate date) {
        return orderEntityRepository.sumSaleByDate(date);
    }

    @Override
    public Long countByOrderDate(LocalDate date) {
        return orderEntityRepository.countByOrderDate(date);
    }

    @Override
    public List<OrderResponse> findRecentOrders() {
        return orderEntityRepository.findRecentOrders(PageRequest.of(0,5))
                .stream()
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }


    private boolean verifyRazorpaySignature(@NonNull String razorpayOrderId, @NonNull String razorpayPaymentId, @NonNull String razorpaySignature) {
        /*
        todo: verify signature using razorpay's secret key
        todo: temporary returning ture
        */

        String payload=razorpayOrderId+"|"+razorpayPaymentId;
        try {
            return Utils.verifySignature(payload,razorpaySignature,secret);
        } catch (RazorpayException e) {
            System.err.println("Razorpay signature verification failed: "+e.getMessage());
            return false;
        }

//        todo:for testing purpose not recommended for production
//        return true;
    }
}
