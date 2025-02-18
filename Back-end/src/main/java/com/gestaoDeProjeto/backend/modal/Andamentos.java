package com.gestaoDeProjeto.backend.modal;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import org.hibernate.annotations.GenericGenerator;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Andamentos {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Lob
    @Basic(fetch = FetchType.EAGER) 
    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createdDateTime;

    private LocalDateTime dataModificacao;

    @ManyToOne
    private User user;

    @ManyToOne
    @JsonBackReference
    private Issue issue;
}
