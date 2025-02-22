package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.Invitation;
import java.util.UUID;
public interface InvitationRepository extends JpaRepository<Invitation,UUID> {

    Invitation findByToken(String token);

    Invitation findByEmail(String userEmail);
}
