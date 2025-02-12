package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Invitation;
import com.gestaoDeProjeto.backend.repository.InvitationRepository;
import jakarta.mail.MessagingException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvitationServiceImplementation implements InvitationService{
    @Autowired
    private InvitationRepository invitationRepository;

    @Autowired
    private EmailService emailService;
    @Override
    public void sendInvitation(String email, Long projectId) throws MessagingException {
        String invitationToken= UUID.randomUUID().toString();

        Invitation invitation = new Invitation();
        invitation.setEmail(email);
        invitation.setProjectId(projectId);
        invitation.setToken(invitationToken);

        invitationRepository.save(invitation);

        String invitationLink="http://localhost:5173/accept_invitation?token="+invitationToken;
        System.out.println("PRINTE AQW: ");
        System.out.println("Invitation link: "+invitationLink);
        System.out.println("Email: "+email);
        emailService.sendEmailWithToken(email,invitationLink);

    }

    @Override
    public Invitation acceptInvitation(String token, Long userId) throws Exception {
        Invitation invitation = invitationRepository.findByToken(token);
        if(invitation == null) {
            throw new Exception("Invalid invitation token");
        }
        return invitation;
    }

    @Override
    public String getTokenByUserMail(String userEmail) {
        Invitation invitation=invitationRepository.findByEmail(userEmail);
        return invitation.getToken();
    }

    @Override
    public void deleteToken(String token) {
        Invitation invitation=invitationRepository.findByToken(token);

        invitationRepository.delete(invitation);

    }
}