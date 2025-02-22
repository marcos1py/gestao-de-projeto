package com.gestaoDeProjeto.backend.repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class InviteRequest {
    private UUID projectId;
    private String email;
}