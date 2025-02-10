package com.gestaoDeProjeto.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestaoDeProjeto.backend.modal.Chat;
import com.gestaoDeProjeto.backend.modal.Message;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.MessageRepository;
import com.gestaoDeProjeto.backend.repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImplementation implements MessageService {
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectService projectService;

    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception{
        User sender = userRepository.findById(senderId)
                .orElseThrow(() -> new Exception("User not found with id: "+ senderId));

        Chat chat = projectService.getProjectById(projectId).getChat();

        Message message = new Message();
        message.setContent(content);
        message.setSender (sender);
        message.setCreatedAt(LocalDateTime.now());
        message.setChat(chat);
        Message savedMessage = messageRepository.save(message);

        chat. getMessages().add(savedMessage);
        return savedMessage;
    }

    @Override
    public List<Message> getMessagesByProjectId(Long projectId) throws Exception{
        Chat chat = projectService.getChatByProjectId(projectId);
        List<Message> findByChatIdOrderByCreatedAtAsc = messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
        return findByChatIdOrderByCreatedAtAsc;
    }
}