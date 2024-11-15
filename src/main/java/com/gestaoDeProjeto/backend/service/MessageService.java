package com.gestaoDeProjeto.backend.service;

import java.util.List;

import com.gestaoDeProjeto.backend.modal.Message;

public interface MessageService {
    Message sendMessage(Long senderId, Long chatId, String content) throws Exception;

    List<Message> getMessagesByProjectId(Long projectId) throws Exception;
}