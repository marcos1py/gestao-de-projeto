package com.gestaoDeProjeto.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.UserRepository;
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
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User userExists = userRepository.findByEmail(user.getEmail());
        
        if (userExists != null) {
            throw new RuntimeException("Email já cadastrado");
        }

        User createdUser = new User();
        createdUser.setEmail(user.getEmail());
        createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
        createdUser.setFullName(user.getFullName());
        User savedUser = userRepository.save(createdUser);

        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
    
    
}
