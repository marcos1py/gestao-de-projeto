package com.gestaoDeProjeto.backend.service;

import java.util.List;
import java.util.Optional;

import com.gestaoDeProjeto.backend.modal.Issue;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.requist.IssueRequest;

public interface IssueService {
    Issue getIssueById(Long issueId) throws Exception;

    List<Issue> getIssueByProjectId(Long projectId) throws Exception;

    Issue createIssue(IssueRequest issue, User user) throws Exception;

    void deleteIssue(Long issueId,Long userid) throws Exception;

    Issue addUserToIssue(Long issueId, Long userId) throws Exception;

    Issue updateStatus(Long issueId, String status) throws Exception;
    List<Issue> getIssuesForUser(User user) throws Exception;

}