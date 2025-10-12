package in.shivamchaudhari.retail_software.repository;

import in.shivamchaudhari.retail_software.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity,Long> {

    Optional<UserEntity> findByEmial(String email);
    Optional<UserEntity> findByUserId(String userId);


}
