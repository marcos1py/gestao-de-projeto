package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestaoDeProjeto.backend.modal.Issue;
import com.gestaoDeProjeto.backend.modal.User;
import java.util.List;
import java.util.UUID;
public interface IssueRepository extends JpaRepository<Issue, UUID> {
    
    List<Issue> findByProjectId(UUID id);
    
    List<Issue> findByAssignee(User assignee);
}
