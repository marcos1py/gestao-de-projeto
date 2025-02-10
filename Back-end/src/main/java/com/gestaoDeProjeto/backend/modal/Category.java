package com.gestaoDeProjeto.backend.modal;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;


@Entity
@Data
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    // Construtor padrão necessário para JPA
    public Category() {}

    // Construtor para desserialização via String
    @JsonCreator
    public Category(@JsonProperty("nome") String nome) {
        this.nome = nome;
    }

}
