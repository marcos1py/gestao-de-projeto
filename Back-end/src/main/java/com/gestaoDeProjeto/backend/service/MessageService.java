package com.gestaoDeProjeto.backend.service;

import java.util.List;
import java.util.UUID;
import com.gestaoDeProjeto.backend.modal.Message;

public interface MessageService {
    Message sendMessage(UUID senderId, UUID chatId, String content) throws Exception;

    List<Message> getMessagesByProjectId(UUID projectId) throws Exception;
}