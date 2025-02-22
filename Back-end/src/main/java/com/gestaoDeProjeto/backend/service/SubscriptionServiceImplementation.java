package com.gestaoDeProjeto.backend.service;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;
import com.gestaoDeProjeto.backend.modal.PlanType;
import com.gestaoDeProjeto.backend.modal.Subscription;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.SubscriptionRepository;

@Service
public class SubscriptionServiceImplementation implements SubscriptionService{
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private SubscriptionRepository subscriptionRepository;
	
	@Override
	public Subscription createSubscription(User user) {
		Subscription subscription = new Subscription();
		subscription.setUser(user);
		subscription.setPlanType(PlanType.FREE);
		subscription.setSubStartDate(LocalDate.now());
		subscription.setSubEndDate(LocalDate.now().plusMonths(12));
		subscription.setValid(true);
		
		subscriptionRepository.save(subscription);
		
		return subscription;
	}

	@Override
	public Subscription getUsersSubscription(UUID userId) throws Exception {
		 Subscription subscription = subscriptionRepository.findByUserId(userId);
		 if(!isValid(subscription)) {
			 subscription.setPlanType(PlanType.FREE);
			 subscription.setSubStartDate(LocalDate.now());
			 subscription.setSubEndDate(LocalDate.now().plusYears(1));
		 }
		 return subscriptionRepository.save(subscription);
	}

	@Override
	public Subscription upgradSubscription(UUID userId, PlanType planType) {
		Subscription subscription = subscriptionRepository.findByUserId(userId);
		
		subscription.setPlanType(planType);
		subscription.setSubStartDate(LocalDate.now());
		if(planType.equals(PlanType.ANNUALLY))
			subscription.setSubEndDate(LocalDate.now().plusYears(1));
		else
			subscription.setSubEndDate(LocalDate.now().plusMonths(1));
		
		
		return subscriptionRepository.save(subscription);
	}

	@Override
	public boolean isValid(Subscription subscription) {
		if(subscription.getPlanType().equals(PlanType.FREE))
			return true;
		LocalDate currentDate = LocalDate.now();
		LocalDate endDate = subscription.getSubEndDate();
		
		return endDate.isAfter(currentDate) || endDate.equals(currentDate);
	}

}