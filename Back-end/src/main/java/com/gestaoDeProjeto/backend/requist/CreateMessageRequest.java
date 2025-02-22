package com.gestaoDeProjeto.backend.requist;
import java.util.UUID;
import lombok.Data;

@Data
public class CreateMessageRequest {
    private UUID senderId;
    private UUID projectId;
    private String content;
}