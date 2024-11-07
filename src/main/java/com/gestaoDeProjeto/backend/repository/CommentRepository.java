package com.gestaoDeProjeto.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestaoDeProjeto.backend.modal.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository <Comment,Long> {

    List <Comment> findCommentByIssueId(Long issueId);
}
