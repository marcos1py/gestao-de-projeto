package com.gestaoDeProjeto.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestaoDeProjeto.backend.modal.Comments;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.requist.CreateCommentRequest;
import com.gestaoDeProjeto.backend.response.MessageResponse;
import com.gestaoDeProjeto.backend.service.CommentService;
import com.gestaoDeProjeto.backend.service.UserService;

import java.util.List;
@RestController
@RequestMapping("/api/comments")
public class CommentController {
	
	@Autowired
	private CommentService commentService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<Comments> createComment(@RequestBody CreateCommentRequest req,
												@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		Comments createdComment = commentService.createComment(req.getIssueId(), user.getId(), req.getContent());
		return new ResponseEntity<>(createdComment,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{commentId}")
	public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,
			@RequestHeader("Authorization") String jwt) throws Exception{
				User user = userService.findUserProfileByJwt(jwt);
				commentService.deleteComment(commentId, user.getId());
				MessageResponse response = new MessageResponse();
				response.setMessage("Comment Deleted Successfully..!");
				return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/{issueId}")
	public ResponseEntity<List<Comments>> getCommentByIssueId(@PathVariable Long issueId){
		List<Comments> comments = commentService.findCommentsByIssueId(issueId);
		return new ResponseEntity<>(comments,HttpStatus.OK);
	}
}