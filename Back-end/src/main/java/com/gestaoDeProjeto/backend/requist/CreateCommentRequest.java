package com.gestaoDeProjeto.backend.requist;

import lombok.Data;

@Data
public class CreateCommentRequest {
    private Long issueId;
    private String content;
}