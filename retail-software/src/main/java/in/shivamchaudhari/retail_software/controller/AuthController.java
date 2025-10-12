package in.shivamchaudhari.retail_software.controller;


import in.shivamchaudhari.retail_software.io.AuthRequest;
import in.shivamchaudhari.retail_software.io.AuthResponse;
import in.shivamchaudhari.retail_software.service.UserService;
import in.shivamchaudhari.retail_software.service.impl.AppUserDetailsService;
import in.shivamchaudhari.retail_software.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService appuserDetailsService;
    private final UserDetailsService userDetailsService;
    private final UserService userService;
    private final JwtUtil jwtUtil;
    @PostMapping("/encode")
    public String encodePassword(@RequestBody Map<String,String > request){
        return passwordEncoder.encode(request.get("password"));
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request)throws Exception{
        authenticate(request.getEmail(),request.getPassword());
        final UserDetails userDetails= appuserDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken=jwtUtil.generateToken(userDetails);

        //TODO: fetch the role from repository
        String role=userService.getUserRole(request.getEmail());


        return  new AuthResponse(request.getEmail(),role,request.getPassword());
    }
    private void authenticate(String email,String password) throws Exception{
        try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        }catch (DisabledException e){
                throw new Exception("bad disabled");
        }catch (BadCredentialsException e){
               throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email or Password is incorrect");
        }
    }
}
