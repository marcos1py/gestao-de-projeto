package com.gestaoDeProjeto.backend.service;

import org.springframework.beans.factory.annotation.Autowired;

import com.gestaoDeProjeto.backend.modal.Chat;
import com.gestaoDeProjeto.backend.repository.ChatRepository;

import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl implements ChatService{

    @Autowired
    private ChatRepository chatRepository;

    @Override
    public Chat createChat(Chat chat) {

        return chatRepository.save(chat);
    }
}