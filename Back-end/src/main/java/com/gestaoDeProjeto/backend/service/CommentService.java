package com.gestaoDeProjeto.backend.service;

import java.util.List;

import com.gestaoDeProjeto.backend.modal.Comments;


public interface CommentService {
    Comments createComment(Long issueId, Long userId, String content) throws Exception;

    void deleteComment(Long commentId, Long userId) throws Exception;

    List<Comments> findCommentsByIssueId(Long issueId);
}