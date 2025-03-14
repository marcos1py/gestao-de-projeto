package com.gestaoDeProjeto.backend.repository;

import com.gestaoDeProjeto.backend.modal.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
    Optional<Category> findByNome(String nome);
}
