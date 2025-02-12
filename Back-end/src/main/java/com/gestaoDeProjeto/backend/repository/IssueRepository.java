package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.gestaoDeProjeto.backend.modal.Issue;
import com.gestaoDeProjeto.backend.modal.User;
import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    
    List<Issue> findByProjectId(Long id);
    
    List<Issue> findByAssignee(User assignee);
}
