package in.shivamchaudhari.retail_software.service;

import in.shivamchaudhari.retail_software.io.UserRequest;
import in.shivamchaudhari.retail_software.io.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse createUser(UserRequest userRequest);
    String getUserRole(String username);
    List<UserResponse> readUser();
    void deleteUser(String id);
}
