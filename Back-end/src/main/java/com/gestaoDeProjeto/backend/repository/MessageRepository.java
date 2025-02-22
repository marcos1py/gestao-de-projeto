package com.gestaoDeProjeto.backend.repository;


import com.gestaoDeProjeto.backend.modal.Message;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import java.util.List;

public interface MessageRepository extends JpaRepository <Message,UUID> {

    List<Message> findByChatIdOrderByCreatedAtAsc(UUID chatId);
}