package com.gestaoDeProjeto.backend.requist;

import lombok.Data;

@Data
public class CreateAndamentoRequest {
    private Long issueId;
    private String content;
}