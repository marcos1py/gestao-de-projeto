package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.User;

public interface UserService {
    User findUserProfileByJwt(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(Long id) throws Exception;    

    User updateUsersProjectSize(User user, int number) throws Exception;
}
