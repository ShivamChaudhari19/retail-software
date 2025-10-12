package in.shivamchaudhari.retail_software.service.impl;

import in.shivamchaudhari.retail_software.entity.UserEntity;
import in.shivamchaudhari.retail_software.io.UserRequest;
import in.shivamchaudhari.retail_software.io.UserResponse;
import in.shivamchaudhari.retail_software.repository.UserRepository;
import in.shivamchaudhari.retail_software.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public UserResponse createUser(UserRequest userRequest) {
        UserEntity user=convertToUserEntity(userRequest);
        user=userRepository.save(user);
        return convertToUserResponse(user);
    }

    private UserEntity convertToUserEntity(UserRequest userRequest) {
        return UserEntity.builder()
                .userId(UUID.randomUUID().toString())
                .email(userRequest.getEmail())
                .name(userRequest.getName())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(userRequest.getRole().toUpperCase())
                .build();
    }
    private UserResponse convertToUserResponse(UserEntity userEntity)
    {
        return UserResponse.builder()
                .userId(userEntity.getUserId())
                .createdAt(userEntity.getCreatedAt())
                .email(userEntity.getEmail())
                .name(userEntity.getName())
                .updatedAt(userEntity.getUpdatedAt())
                .role(userEntity.getRole())
                .build();
    }
    @Override
    public String getUserRole(String username){
        UserEntity ExistingUser =userRepository.findByEmial(username)
                .orElseThrow(()->new UsernameNotFoundException("user not found for email: "+username));
        return ExistingUser.getRole();
    }

    @Override
    public List<UserResponse> readUser() {
        return userRepository.findAll()
                .stream()
                .map(userEntity -> convertToUserResponse(userEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void deleteUser(String id) {
        userRepository.delete(
                userRepository.findByUserId(id)
                        .orElseThrow(()->new UsernameNotFoundException("User not Found"))
        );
    }
}
