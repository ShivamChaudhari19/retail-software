package in.shivamchaudhari.retail_software.repository;

import in.shivamchaudhari.retail_software.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity,Long> {
}
