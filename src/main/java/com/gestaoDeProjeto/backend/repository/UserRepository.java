package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.User;

public interface UserRepository extends JpaRepository<User, Long> {
 User findByEmail(String email);

}
