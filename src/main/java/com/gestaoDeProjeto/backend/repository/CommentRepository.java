package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.Comments;

import java.util.List;

public interface CommentRepository extends JpaRepository <Comments,Long> {

    List <Comments> findCommentByIssueId(Long issueId);
}
