package com.gestaoDeProjeto.backend.service;

import java.util.List;
import java.util.UUID;

import com.gestaoDeProjeto.backend.modal.Andamentos;


public interface AndamentoService {
    Andamentos createAndamento(Long issueId, Long userId, String content) throws Exception;
    void deleteAndamento(UUID andamentoId, Long userId) throws Exception;
    List<Andamentos> findAndamentosByIssueId(Long issueId);
}