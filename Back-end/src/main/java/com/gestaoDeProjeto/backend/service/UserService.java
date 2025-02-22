package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.User;
import java.util.UUID;
public interface UserService {
    User findUserProfileByJwt(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(UUID id) throws Exception;    

    User updateUsersProjectSize(User user, int number) throws Exception;
}
