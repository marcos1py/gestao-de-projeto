package com.gestaoDeProjeto.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.gestaoDeProjeto.backend.modal.Issue;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.requist.IssueRequest;

public interface IssueService {
    Issue getIssueById(UUID issueId) throws Exception;

    List<Issue> getIssueByProjectId(UUID projectId) throws Exception;

    Issue createIssue(IssueRequest issue, User user) throws Exception;

    void deleteIssue(UUID issueId,UUID userid) throws Exception;

    Issue addUserToIssue(UUID issueId, UUID userId) throws Exception;

    Issue updateStatus(UUID issueId, String status) throws Exception;
    List<Issue> getIssuesForUser(User user) throws Exception;

}