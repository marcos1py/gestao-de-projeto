package com.gestaoDeProjeto.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.User;

public interface UserRepository extends JpaRepository<User, UUID> {
 User findByEmail(String email);

}
