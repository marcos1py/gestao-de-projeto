package com.gestaoDeProjeto.backend.modal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import com.fasterxml.jackson.annotation.JsonCreator;
import lombok.Data;

@Entity
@Data
public class Tags {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;
    
    // Construtor padrão necessário para JPA
    public Tags() {}

    // Construtor para desserialização via String
    @JsonCreator
    public Tags(String nome) {
        this.nome = nome;
    }
}
