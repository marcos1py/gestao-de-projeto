package com.gestaoDeProjeto.backend.service;

import java.nio.file.OpenOption;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;
import com.gestaoDeProjeto.backend.config.JwtProvider;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.UserRepository;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserProfileByJwt(String jwt) throws Exception {

        String email = JwtProvider.getEmailFromToken(jwt);
        return findUserByEmail(email);
    }
    @Override
    public User findUserByEmail(String email) throws Exception {

        User user = userRepository.findByEmail(email);

        if (user==null){
            throw new Exception("User not found!");
        }
        return user;
    }

    @Override
    public User findUserById(UUID userId) throws Exception {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()){
            throw new Exception("User not found!");
        }
        return optionalUser.get();
    }

    @Override
    public User updateUsersProjectSize(User user, int number) throws Exception {

        user.setProjectSize(user.getProjectSize()+number);
        return userRepository.save(user);
    }
    @Override
    public List<User> getAllUsers() throws Exception {
        return userRepository.findAll();
    }
}