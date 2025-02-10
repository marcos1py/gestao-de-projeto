package com.gestaoDeProjeto.backend.repository;

import com.gestaoDeProjeto.backend.modal.Tags;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagsRepository extends JpaRepository<Tags, Long> {
    Optional<Tags> findByNome(String nome);
}
