package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.PlanType;
import com.gestaoDeProjeto.backend.modal.Subscription;
import com.gestaoDeProjeto.backend.modal.User;

public interface SubscriptionService {
	Subscription createSubscription(User user);
	Subscription getUsersSubscription(Long userId) throws Exception;
	Subscription upgradSubscription(Long userId,PlanType planType);
	boolean isValid(Subscription subscription);
}