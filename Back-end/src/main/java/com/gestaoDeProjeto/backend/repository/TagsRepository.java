package com.gestaoDeProjeto.backend.repository;

import com.gestaoDeProjeto.backend.modal.Tags;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagsRepository extends JpaRepository<Tags, Long> {
}
