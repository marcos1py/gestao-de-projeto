package com.gestaoDeProjeto.backend.modal;

import java.time.LocalDate;
import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
@Entity
public class Subscription {
	
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;
	
	private LocalDate subStartDate;
	
	private LocalDate subEndDate;
	
	private PlanType planType;
	
	private boolean isValid;
	
	@OneToOne
	private User user;

	public Subscription() {
		super();
	}

	public Subscription(UUID id, LocalDate subStartDate, LocalDate subEndDate, PlanType planType, boolean isValid,
			User user) {
		super();
		this.id = id;
		this.subStartDate = subStartDate;
		this.subEndDate = subEndDate;
		this.planType = planType;
		this.isValid = isValid;
		this.user = user;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public LocalDate getSubStartDate() {
		return subStartDate;
	}

	public void setSubStartDate(LocalDate subStartDate) {
		this.subStartDate = subStartDate;
	}

	public LocalDate getSubEndDate() {
		return subEndDate;
	}

	public void setSubEndDate(LocalDate subEndDate) {
		this.subEndDate = subEndDate;
	}

	public PlanType getPlanType() {
		return planType;
	}

	public void setPlanType(PlanType planType) {
		this.planType = planType;
	}

	public boolean isValid() {
		return isValid;
	}

	public void setValid(boolean isValid) {
		this.isValid = isValid;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Subscription [id=" + id + ", subStartDate=" + subStartDate + ", subEndDate=" + subEndDate
				+ ", planType=" + planType + ", isValid=" + isValid + ", user=" + user + "]";
	}
	
	
}