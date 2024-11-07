package com.gestaoDeProjeto.backend.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestaoDeProjeto.backend.config.JwtProvider;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.UserRepository;
import com.gestaoDeProjeto.backend.requist.LoginRequist;
import com.gestaoDeProjeto.backend.response.AuthResponse;
import com.gestaoDeProjeto.backend.service.CustumeUserDatailsImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustumeUserDatailsImpl custumeUserDatailsImpl;  
    
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUser(@RequestBody User user) {
        User userExists = userRepository.findByEmail(user.getEmail());
        
        if (userExists != null) {
            throw new RuntimeException("Email já cadastrado");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setFullName(user.getFullName());
        User savedUser = userRepository.save(createdUser);

        
        Authentication authenticator = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authenticator);

        String jwt = JwtProvider.genereteToken(authenticator);

        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Usuário criado com sucesso");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PostMapping("/signing")
    public ResponseEntity<AuthResponse> signing(@RequestBody LoginRequist loginRequist){
        String userName =  loginRequist.getEmail();
        String password = loginRequist.getPassword();

        Authentication authenticator = authenticator(userName, password);
        SecurityContextHolder.getContext().setAuthentication(authenticator);

        String jwt = JwtProvider.genereteToken(authenticator);

        AuthResponse response = new AuthResponse();
        response.setJwt(jwt);
        response.setMessage("Usuário criado com sucesso");

        return new ResponseEntity<>(response, HttpStatus.CREATED);

    }

    private Authentication authenticator(String userName, String password) {
        UserDetails userDetails = custumeUserDatailsImpl.loadUserByUsername(userName);
        if (userDetails == null) {
            throw new BadCredentialsException("Usuário ou senha inválidos");
        }
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            throw new BadCredentialsException("senha inválidos");
        }
        return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
    }
}
