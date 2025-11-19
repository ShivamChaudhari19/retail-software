package in.shivamchaudhari.retail_software.controller;

import in.shivamchaudhari.retail_software.io.DashboardResponse;
import in.shivamchaudhari.retail_software.io.OrderResponse;
import in.shivamchaudhari.retail_software.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor

public class DashboardController {

    private final OrderService orderService;
    @GetMapping
    public DashboardResponse getDashboardData(){
        LocalDate today = LocalDate.now();
        Long todayOrderCount=orderService.countByOrderDate(today);
        Double todaySale =orderService.sumSalesByDate(today);
        List<OrderResponse> recentOrders=orderService.findRecentOrders();
        return new DashboardResponse(
                todaySale !=null? todaySale :0.0,
                todayOrderCount!=null?todayOrderCount:0,
                recentOrders
        );
    }
}
