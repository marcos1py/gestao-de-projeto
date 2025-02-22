package com.gestaoDeProjeto.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestaoDeProjeto.backend.modal.Andamentos;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.requist.CreateAndamentoRequest;
import com.gestaoDeProjeto.backend.response.MessageResponse;
import com.gestaoDeProjeto.backend.service.AndamentoService;
import com.gestaoDeProjeto.backend.service.UserService;
import java.util.UUID;
import java.util.List;
@RestController
@RequestMapping("/api/andamentos")
public class AndamentoController {
	
	@Autowired
	private AndamentoService andamentoService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping
	public ResponseEntity<Andamentos> createAndamento(@RequestBody CreateAndamentoRequest req,
												@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		Andamentos createdAndamento = andamentoService.createAndamento(req.getIssueId(), user.getId(), req.getContent());
		return new ResponseEntity<>(createdAndamento,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/{andamentoId}")
	public ResponseEntity<MessageResponse> deleteAndamento(@PathVariable java.util.UUID andamentoId,
			@RequestHeader("Authorization") String jwt) throws Exception{
				User user = userService.findUserProfileByJwt(jwt);
				andamentoService.deleteAndamento(andamentoId, user.getId());
				MessageResponse response = new MessageResponse();
				response.setMessage("Andamento Deleted Successfully..!");
				return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/{issueId}")
	public ResponseEntity<List<Andamentos>> getAndamentoByIssueId(@PathVariable UUID issueId){
		List<Andamentos> andamentos = andamentoService.findAndamentosByIssueId(issueId);
		return new ResponseEntity<>(andamentos,HttpStatus.OK);
	}
}