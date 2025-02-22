package com.gestaoDeProjeto.backend.service;

import java.util.List;
import java.util.UUID;

import com.gestaoDeProjeto.backend.modal.Andamentos;


public interface AndamentoService {
    Andamentos createAndamento(UUID issueId, UUID userId, String content) throws Exception;
    void deleteAndamento(UUID andamentoId, UUID userId) throws Exception;
    List<Andamentos> findAndamentosByIssueId(UUID issueId);
}