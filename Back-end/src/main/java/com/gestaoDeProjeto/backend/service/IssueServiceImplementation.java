package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Issue;
import com.gestaoDeProjeto.backend.modal.Project;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.IssueRepository;
import com.gestaoDeProjeto.backend.requist.IssueRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class IssueServiceImplementation implements IssueService {

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Override
    public Issue getIssueById(UUID issueId) throws Exception {
        Optional<Issue> issue = issueRepository.findById(issueId);
        if (issue.isPresent()) {
            return issue.get();
        }
        throw new Exception("No issues found with issueId " + issueId);
    }

    @Override
    public List<Issue> getIssueByProjectId(UUID projectId) throws Exception {
        return issueRepository.findByProjectId(projectId);
    }

    @Override
    public Issue createIssue(IssueRequest issueRequest, User user) throws Exception {
        Project project = projectService.getProjectById(issueRequest.getProjectId());
        Issue issue = new Issue();
        issue.setTitle(issueRequest.getTitle());
        issue.setDescription(issueRequest.getDescription());
        issue.setStatus(issueRequest.getStatus());
        issue.setPriority(issueRequest.getPriority());
        issue.setDueDate(issueRequest.getDueDate());
        issue.setProjectID(project.getId());
        issue.setProject(project);

        // Define a data/hora de criação com o horário atual
        issue.setCreatedAt(LocalDateTime.now());

        // Define o usuário que está criando a issue como o assignee (ou ajuste conforme sua lógica)
        issue.setAssignee(user);

        return issueRepository.save(issue);
    }

    @Override
    public void deleteIssue(UUID issueId, UUID userId) throws Exception {
        getIssueById(issueId);
        issueRepository.deleteById(issueId);
    }

    @Override
    public Issue addUserToIssue(UUID issueId, UUID userId) throws Exception {
        User user = userService.findUserById(userId);
        Issue issue = getIssueById(issueId);
        issue.setAssignee(user);
        return issueRepository.save(issue);
    }

    @Override
    public Issue updateStatus(UUID issueId, String status) throws Exception {
        Issue issue = getIssueById(issueId);
        issue.setStatus(status);
        return issueRepository.save(issue);
    }

    // Nova implementação: retorna as issues onde o usuário é o assignee
    @Override
    public List<Issue> getIssuesForUser(User user) throws Exception {
        return issueRepository.findByAssignee(user);
    }
}
