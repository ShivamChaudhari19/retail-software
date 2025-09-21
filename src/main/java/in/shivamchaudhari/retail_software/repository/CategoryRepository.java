package in.shivamchaudhari.retail_software.repository;

import in.shivamchaudhari.retail_software.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {
}
