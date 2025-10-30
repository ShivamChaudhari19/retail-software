package in.shivamchaudhari.retail_software.entity;

import in.shivamchaudhari.retail_software.io.PaymentDetails;
import in.shivamchaudhari.retail_software.io.PaymentMethod;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tbl_order")
@Data
@AllArgsConstructor
@NoArgsConstructor

@Builder
public class OrderEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderId;
    private String customerName;
    private String phoneNumber;
    private Double subtotal;
    private Double tax;
    private Double grandTotal;
    private LocalDateTime createdAt;
    @OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
    @JoinColumn(name = "order_id")
    private List<OrderItemEntity> items=new ArrayList<>();

    @Embedded
    private PaymentDetails paymentDetails;

    @Enumerated
    @Column(name = "payment_method")
    private PaymentMethod paymentMethod;
    @PrePersist
    protected void onCreate(){
        this.orderId="ORD"+System.currentTimeMillis();
        this.createdAt=LocalDateTime.now();
    }

}
