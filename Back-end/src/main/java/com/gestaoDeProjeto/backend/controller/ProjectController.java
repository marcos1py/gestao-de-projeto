package com.gestaoDeProjeto.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestaoDeProjeto.backend.modal.Category;
import com.gestaoDeProjeto.backend.modal.Chat;
import com.gestaoDeProjeto.backend.modal.Invitation;
import com.gestaoDeProjeto.backend.modal.Project;
import com.gestaoDeProjeto.backend.modal.ProjectDTO;
import com.gestaoDeProjeto.backend.modal.Tags;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.InviteRequest;
import com.gestaoDeProjeto.backend.response.MessageResponse;
import com.gestaoDeProjeto.backend.service.CategoryService;
import com.gestaoDeProjeto.backend.service.InvitationService;
import com.gestaoDeProjeto.backend.service.ProjectService;
import com.gestaoDeProjeto.backend.service.TagsService;
import com.gestaoDeProjeto.backend.service.UserService;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

	@Autowired
	private ProjectService projectService;

	@Autowired
	private UserService userService;

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private TagsService tagsService;

	@Autowired
	private InvitationService invitationService;

	@GetMapping
	public ResponseEntity<List<Project>> getProjects(
		@RequestParam(required = false) String category,
		@RequestParam(required = false) String tag,
		@RequestParam(required = false) String minDate,
		@RequestParam(required = false) String maxDate,
		@RequestHeader("Authorization") String jwt) throws Exception {
		
		User user = userService.findUserProfileByJwt(jwt);
		List<Project> projects = projectService.getProjectByTeam(user, category, tag, minDate, maxDate);
		return new ResponseEntity<>(projects, HttpStatus.OK);
	}
	

	@GetMapping("/{projectId}")
	public ResponseEntity<Project> getProjectById(
			@PathVariable Long projectId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Project projects = projectService.getProjectById(projectId);
		return new ResponseEntity<>(projects, HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Project> createProject(
			@RequestBody ProjectDTO projectDTO,
			@RequestHeader("Authorization") String jwt) throws Exception {

		// Buscar o usuário a partir do JWT
		User user = userService.findUserProfileByJwt(jwt);

		// Buscar a categoria pelo ID usando o serviço
		Category category = categoryService.getCategoryByName(projectDTO.getCategoria())
        .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));


		// Buscar as tags pelos nomes usando o serviço
		List<Tags> tags = new ArrayList<>();
		for (String tagName : projectDTO.getTags()) {
			Tags tag = tagsService.getAllTags().stream()
					.filter(t -> t.getNome().equals(tagName))
					.findFirst()
					.orElseThrow(() -> new RuntimeException("Tag não encontrada: " + tagName));
			tags.add(tag);
		}

		// Criar o novo projeto com os dados recebidos
		Project project = new Project();
		project.setName(projectDTO.getName());
		project.setDescription(projectDTO.getDescription());
		project.setCreatedAt(LocalDateTime.now());
		project.setCategory(category);
		project.setTags(tags);
		project.setOwner(user); // Associa o usuário como proprietário

		// Salvar o projeto utilizando o serviço
		Project createdProject = projectService.createProject(project, user);

		return new ResponseEntity<>(createdProject, HttpStatus.CREATED);
	}

	@PatchMapping("/{projectId}")
	public ResponseEntity<Project> updateProject(
			@PathVariable Long projectId,
			@RequestBody Project project,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Project updatedProject = projectService.updateProject(project, projectId);
		return new ResponseEntity<>(updatedProject, HttpStatus.OK);
	}

	@DeleteMapping("/{projectId}")
	public ResponseEntity<MessageResponse> deleteProject(
			@PathVariable Long projectId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		projectService.deleteProject(projectId, user.getId());
		MessageResponse response = new MessageResponse("project deleted successfully");
		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<List<Project>> searchProjects(
			@RequestParam(required = false) String keyword,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		List<Project> projects = projectService.searchProjects(keyword, user);
		return new ResponseEntity<>(projects, HttpStatus.OK);
	}

	@GetMapping("/{projectId}/chat")
	public ResponseEntity<Chat> getChatProjectById(
			@PathVariable Long projectId,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Chat chat = projectService.getChatByProjectId(projectId);
		return new ResponseEntity<>(chat, HttpStatus.OK);
	}

	@PostMapping("/invite")
	public ResponseEntity<MessageResponse> inviteToProject(
			@RequestBody InviteRequest inviteRequest,
			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		invitationService.sendInvitation(inviteRequest.getEmail(), inviteRequest.getProjectId());
		MessageResponse messageResponse = new MessageResponse("User successfully invited to the project");

		return new ResponseEntity<>(messageResponse, HttpStatus.OK);
	}

	@GetMapping("/accept_invitation")
	public ResponseEntity<Invitation> acceptInvitation(
			@RequestParam String token,

			@RequestHeader("Authorization") String jwt) throws Exception {
		User user = userService.findUserProfileByJwt(jwt);
		Invitation invitaion = invitationService.acceptInvitation(token, user.getId());
		projectService.addUserToProject(invitaion.getProjectId(), user.getId());

		return new ResponseEntity<>(invitaion, HttpStatus.ACCEPTED);
	}

}