package com.gestaoDeProjeto.backend.modal;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subscription {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private LocalDate subscriptionStartDate;
    private LocalDate subscriptionEndDate;

    private PlanType planType;
    private boolean isValid;

    @OneToOne
    private User user;
}