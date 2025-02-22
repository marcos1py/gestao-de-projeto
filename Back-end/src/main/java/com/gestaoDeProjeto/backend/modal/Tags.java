package com.gestaoDeProjeto.backend.modal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.util.UUID;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;

@Entity
@Data
public class Tags {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    private String nome;
    
    // Construtor padrão necessário para JPA
    public Tags() {}

    // Construtor para desserialização via String
    @JsonCreator
    public Tags(String nome) {
        this.nome = nome;
    }
}
