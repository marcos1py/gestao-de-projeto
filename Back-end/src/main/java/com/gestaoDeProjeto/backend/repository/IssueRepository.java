package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.Issue;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {

    public List<Issue> findByProjectId(Long id);
}