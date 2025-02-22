package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;
import com.gestaoDeProjeto.backend.modal.Subscription;

public interface SubscriptionRepository extends JpaRepository <Subscription,UUID> {

    Subscription findByUserId (UUID userId);
}