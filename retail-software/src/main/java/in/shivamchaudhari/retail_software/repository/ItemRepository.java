package in.shivamchaudhari.retail_software.repository;

import in.shivamchaudhari.retail_software.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity,Long> {

    Optional<ItemEntity> findByItemId(String itemId);
    Integer countByCategoryId(Long id);
}
