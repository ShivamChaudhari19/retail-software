package in.shivamchaudhari.retail_software.controller;

import com.razorpay.RazorpayException;
import in.shivamchaudhari.retail_software.io.OrderResponse;
import in.shivamchaudhari.retail_software.io.PaymentRequest;
import in.shivamchaudhari.retail_software.io.PaymentVerificationRequest;
import in.shivamchaudhari.retail_software.io.RazorpayOrderResponse;
import in.shivamchaudhari.retail_software.service.OrderService;
import in.shivamchaudhari.retail_software.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request)   throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(),request.getCurrency());
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(
            @RequestBody PaymentVerificationRequest request
    ){

        return orderService.verifyPayment(request);
    }
}
