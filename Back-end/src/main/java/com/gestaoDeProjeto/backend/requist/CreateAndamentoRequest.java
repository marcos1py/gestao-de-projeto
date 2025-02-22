package com.gestaoDeProjeto.backend.requist;
import java.util.UUID;
import lombok.Data;

@Data
public class CreateAndamentoRequest {
    private UUID issueId;
    private String content;
}