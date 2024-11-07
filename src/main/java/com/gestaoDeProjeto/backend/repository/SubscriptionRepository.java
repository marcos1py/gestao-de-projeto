package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.Subscription;

public interface SubscriptionRepository extends JpaRepository <Subscription,Long> {

    Subscription findByUserId (Long userId);
}