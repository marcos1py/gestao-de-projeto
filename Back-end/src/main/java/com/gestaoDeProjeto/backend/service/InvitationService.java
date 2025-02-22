package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Invitation;

import jakarta.mail.MessagingException;
import java.util.UUID;
public interface InvitationService {
    public void sendInvitation (String email, UUID projectId) throws MessagingException;

    public Invitation acceptInvitation(String token, UUID userId) throws Exception;

    public String getTokenByUserMail(String userEmail);

    void deleteToken(String token);
}