package in.shivamchaudhari.retail_software.service;

import in.shivamchaudhari.retail_software.io.OrderRequest;
import in.shivamchaudhari.retail_software.io.OrderResponse;
import in.shivamchaudhari.retail_software.io.PaymentVerificationRequest;

import java.util.List;

public interface OrderService {
    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrder();

    OrderResponse verifyPayment(PaymentVerificationRequest request);
}

