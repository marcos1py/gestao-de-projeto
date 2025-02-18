package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.Andamentos;

import java.util.List;
import java.util.UUID;

public interface AndamentoRepository extends JpaRepository <Andamentos,UUID> {

    List <Andamentos> findAndamentoByIssueId(Long issueId);
}
