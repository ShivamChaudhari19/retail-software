package in.shivamchaudhari.retail_software.io;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardResponse {
    private Double todaySale;
    private Long todayOrderCount;
    private List<OrderResponse> resentOrders;

}
