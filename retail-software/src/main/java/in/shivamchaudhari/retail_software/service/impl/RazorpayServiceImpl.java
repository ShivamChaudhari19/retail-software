package in.shivamchaudhari.retail_software.service.impl;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import in.shivamchaudhari.retail_software.io.RazorpayOrderResponse;
import in.shivamchaudhari.retail_software.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RazorpayServiceImpl implements RazorpayService {

    @Value("${razorpay.key.id}")
    private String razorpayKeyId;
    @Value("${razorpay.key.secret}")
    private String razorpayKeySecrete;

    @Override
    public RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException {
        RazorpayClient razorpayClient=new RazorpayClient(razorpayKeyId,razorpayKeySecrete);
        JSONObject orderRequest=new JSONObject();
        orderRequest.put("amount",amount*100);
        orderRequest.put("currency",currency);
        orderRequest.put("receipt","order_receipt"+System.currentTimeMillis());
        orderRequest.put("payment_capture",1);
        Order order= razorpayClient.orders.create(orderRequest);
        return convertToRazorpayOrderResponse(order);

    }

    private RazorpayOrderResponse convertToRazorpayOrderResponse(Order order) {
        return RazorpayOrderResponse.builder()
                .id(order.get("id"))
                .entity(order.get("entity"))
                .amount(order.get("amount"))
                .status(order.get("status"))
                .currency(order.get("currency"))
                .receipt(order.get("receipt"))
                .created_at(order.get("created_at"))
                .build();

    }
}
