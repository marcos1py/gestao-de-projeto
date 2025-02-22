package com.gestaoDeProjeto.backend.requist;

import lombok.Data;
import java.util.UUID;
import java.time.LocalDate;

@Data
public class IssueRequest {
    private String title;
    private String description;
    private String status;
    private UUID projectId;
    private String priority;
    private LocalDate dueDate;
}