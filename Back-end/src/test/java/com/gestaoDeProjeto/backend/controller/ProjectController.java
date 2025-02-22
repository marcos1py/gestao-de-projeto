package com.gestaoDeProjeto.backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDateTime;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gestaodeprojeto.backend.modal.Project;
import com.gestaodeprojeto.backend.modal.User;
import com.gestaodeprojeto.backend.service.ProjectService;
import com.gestaodeprojeto.backend.service.UserService;

@WebMvcTest(ProjectController.class)
@ExtendWith(MockitoExtension.class)
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProjectService projectService;

    @MockBean
    private UserService userService;

    private ObjectMapper objectMapper = new ObjectMapper();
    private User mockUser;
    private Project mockProject;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setId(UUID.randomUUID());

        mockProject = new Project();
        mockProject.setId(UUID.randomUUID());
        mockProject.setName("Test Project");
        mockProject.setCreatedAt(LocalDateTime.now());
        mockProject.setOwner(mockUser);
    }

    @Test
    void shouldReturnProjectById() throws Exception {
        when(userService.findUserProfileByJwt(anyString())).thenReturn(mockUser);
        when(projectService.getProjectById(mockProject.getId())).thenReturn(mockProject);

        mockMvc.perform(get("/api/projects/" + mockProject.getId())
                .header("Authorization", "Bearer token"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Project"));
    }

    @Test
    void shouldCreateProjectSuccessfully() throws Exception {
        when(userService.findUserProfileByJwt(anyString())).thenReturn(mockUser);
        when(projectService.createProject(any(Project.class), eq(mockUser))).thenReturn(mockProject);

        mockMvc.perform(post("/api/projects")
                .header("Authorization", "Bearer token")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockProject)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Test Project"));
    }
}
