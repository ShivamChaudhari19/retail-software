package in.shivamchaudhari.retail_software.service;

import com.razorpay.RazorpayException;
import in.shivamchaudhari.retail_software.io.RazorpayOrderResponse;

public interface RazorpayService {
    RazorpayOrderResponse createOrder(Double amount,String currency)throws RazorpayException;
}
