package in.shivamchaudhari.retail_software.filters;

import in.shivamchaudhari.retail_software.service.impl.AppUserDetailsService;
import in.shivamchaudhari.retail_software.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {
    private final AppUserDetailsService appUserDetailsService;
    private final JwtUtil jwtUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
            final String authorizatonHeader =request.getHeader("Authorization");
            String email=null;
            String jwt=null;
            if(authorizatonHeader!=null&&authorizatonHeader.startsWith("Bearer "))
            {
                jwt=authorizatonHeader.substring(7);
                email=jwtUtil.extractUsername(jwt);
            }
            if(email!=null&& SecurityContextHolder.getContext().getAuthentication()==null)
            {
                UserDetails userDeatils=appUserDetailsService.loadUserByUsername(email);
                if(jwtUtil.validateToken(jwt,userDeatils))
                {
                    UsernamePasswordAuthenticationToken authenticationToken=
                            new UsernamePasswordAuthenticationToken(userDeatils,null,userDeatils.getAuthorities());
                    authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            }
            filterChain.doFilter(request,response);
    }
}
