package com.gestaoDeProjeto.backend.service;
import java.util.UUID;
import com.gestaoDeProjeto.backend.modal.PlanType;
import com.gestaoDeProjeto.backend.modal.Subscription;
import com.gestaoDeProjeto.backend.modal.User;

public interface SubscriptionService {
	Subscription createSubscription(User user);
	Subscription getUsersSubscription(UUID userId) throws Exception;
	Subscription upgradSubscription(UUID userId,PlanType planType);
	boolean isValid(Subscription subscription);
}