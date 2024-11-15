package com.gestaoDeProjeto.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gestaoDeProjeto.backend.modal.Comments;
import com.gestaoDeProjeto.backend.modal.Issue;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.CommentRepository;
import com.gestaoDeProjeto.backend.repository.IssueRepository;
import com.gestaoDeProjeto.backend.repository.UserRepository;
import com.gestaoDeProjeto.backend.service.CommentService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImplementation implements CommentService{
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Comments createComment(Long issueId, Long userId, String content) throws Exception {
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

        Comments comment = new Comments();

        comment.setIssue(issue);
        comment.setUser(user);
        comment.setCreatedDateTime(LocalDateTime.now());
        comment.setContent(content);

        Comments savedComment = commentRepository.save(comment);
        issue.getComments().add(savedComment);

        return savedComment;
    }


    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comments> commentOptional = commentRepository.findById(commentId);
        Optional<User> userOptional = userRepository.findById(userId);

        if (commentOptional.isEmpty()) {
            throw new Exception("comment not found with id " + commentId);
        }

        if (userOptional.isEmpty()) {
            throw new Exception("user not found with id " + userId);
        }

        Comments comment = commentOptional.get();
        User user = userOptional.get();

        if (comment.getUser().equals(user)) {
            commentRepository.delete(comment);
        } else {
            throw new Exception("User does not have permission to delete this comment!");
        }
    }

    @Override
    public List<Comments> findCommentsByIssueId(Long issueId) {
        return commentRepository.findCommentByIssueId(issueId);
    }
}