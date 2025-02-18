package com.gestaoDeProjeto.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestaoDeProjeto.backend.modal.Andamentos;
import com.gestaoDeProjeto.backend.modal.Issue;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.AndamentoRepository;
import com.gestaoDeProjeto.backend.repository.IssueRepository;
import com.gestaoDeProjeto.backend.repository.UserRepository;
import com.gestaoDeProjeto.backend.service.AndamentoService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AndamentoServiceImplementation implements AndamentoService{
    @Autowired
    private AndamentoRepository andamentoRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Andamentos createAndamento(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> issueOptional = issueRepository.findById(issueId);
        Optional<User> userOptional = userRepository.findById(userId);

        if(issueOptional.isEmpty()){
            throw new Exception("issue not found with id "+issueId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id " + userId);
        }

        Issue issue = issueOptional.get();
        User user = userOptional.get();

        Andamentos andamento = new Andamentos();

        andamento.setIssue(issue);
        andamento.setUser(user);
        andamento.setCreatedDateTime(LocalDateTime.now());
        andamento.setContent(content);

        Andamentos savedAndamento = andamentoRepository.save(andamento);
        issue.getAndamentos().add(savedAndamento);

        return savedAndamento;
    }


    @Override
    public void deleteAndamento(UUID andamentoId, Long userId) throws Exception {
        Optional<Andamentos> andamentoOptional = andamentoRepository.findById(andamentoId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (andamentoOptional.isEmpty()) {
            throw new Exception("andamento not found with id " + andamentoId);
        }

        if (userOptional.isEmpty()) {
            throw new Exception("user not found with id " + userId);
        }

        Andamentos andamento = andamentoOptional.get();
        User user = userOptional.get();

        if (andamento.getUser().equals(user)) {
            andamentoRepository.delete(andamento);
        } else {
            throw new Exception("User does not have permission to delete this andamento!");
        }
    }

    @Override
    public List<Andamentos> findAndamentosByIssueId(Long issueId) {
        return andamentoRepository.findAndamentoByIssueId(issueId);
    }
}