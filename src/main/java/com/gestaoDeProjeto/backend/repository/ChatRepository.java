package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {


}
