package com.gestaoDeProjeto.backend.repository;

import com.gestaoDeProjeto.backend.modal.Tags;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TagsRepository extends JpaRepository<Tags, UUID> {
    Optional<Tags> findByNome(String nome);
}
