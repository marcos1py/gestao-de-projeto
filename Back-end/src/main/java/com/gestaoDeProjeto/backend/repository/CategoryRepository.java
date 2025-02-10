package com.gestaoDeProjeto.backend.repository;

import com.gestaoDeProjeto.backend.modal.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByNome(String nome);
}
