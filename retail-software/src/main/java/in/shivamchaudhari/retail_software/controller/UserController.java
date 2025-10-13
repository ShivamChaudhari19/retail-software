package in.shivamchaudhari.retail_software.controller;

import in.shivamchaudhari.retail_software.io.UserRequest;
import in.shivamchaudhari.retail_software.io.UserResponse;
import in.shivamchaudhari.retail_software.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor

@RequestMapping("/admin")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserResponse registerUser(@RequestBody UserRequest request){
        try {
            return userService.createUser(request);
        }catch (Exception e)
        {
            throw  new ResponseStatusException(HttpStatus.BAD_REQUEST,"User not Registered");
        }
    }
    @GetMapping("/users")
    public List<UserResponse> getUser(){
        return userService.readUser();
    }

    @DeleteMapping("/users/{userId}")
    public void  deleteUser(@PathVariable String userId){
        try{
            userService.deleteUser(userId);
        }catch (Exception e)
        {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"User not found");
        }
    }
}
