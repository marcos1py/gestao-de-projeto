package com.gestaoDeProjeto.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.service.UserService;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping("/profile")
	public ResponseEntity<User> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception{
		User user = userService.findUserProfileByJwt(jwt);
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
		// Novo endpoint para retornar todos os usuários
		@GetMapping("/all")
		public ResponseEntity<List<User>> getAllUsers() throws Exception {
			List<User> users = userService.getAllUsers();
			return new ResponseEntity<>(users, HttpStatus.OK);
		}
	
		
}