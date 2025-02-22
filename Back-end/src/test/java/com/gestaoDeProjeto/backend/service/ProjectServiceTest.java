package com.gestaoDeProjeto.backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.time.LocalDateTime;
import java.util.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.gestaoDeProjeto.backend.modal.Chat;
import com.gestaoDeProjeto.backend.modal.Project;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.ProjectRepository;


@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private UserService userService;

    @Mock
    private ChatService chatService;

    @InjectMocks
    private ProjectServiceImpl projectService;

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
        mockProject.setTeam(new ArrayList<>(List.of(mockUser)));
    }

    @Test
    void shouldCreateProjectSuccessfully() throws Exception {
        when(projectRepository.save(any(Project.class))).thenReturn(mockProject);
        when(chatService.createChat(any(Chat.class))).thenReturn(new Chat());

        Project createdProject = projectService.createProject(mockProject, mockUser);

        assertNotNull(createdProject);
        assertEquals("Test Project", createdProject.getName());
        assertEquals(mockUser, createdProject.getOwner());
        verify(projectRepository, times(1)).save(any(Project.class));
    }

    @Test
    void shouldReturnProjectById() throws Exception {
        when(projectRepository.findById(mockProject.getId())).thenReturn(Optional.of(mockProject));

        Project project = projectService.getProjectById(mockProject.getId());

        assertNotNull(project);
        assertEquals(mockProject.getId(), project.getId());
        verify(projectRepository, times(1)).findById(mockProject.getId());
    }

    @Test
    void shouldThrowExceptionWhenProjectNotFound() {
        UUID fakeId = UUID.randomUUID();
        when(projectRepository.findById(fakeId)).thenReturn(Optional.empty());

        Exception exception = assertThrows(Exception.class, () -> {
            projectService.getProjectById(fakeId);
        });

        assertEquals("Project not found!", exception.getMessage());
    }

    @Test
    void shouldDeleteProjectSuccessfully() throws Exception {
        when(projectRepository.findById(mockProject.getId())).thenReturn(Optional.of(mockProject));

        projectService.deleteProject(mockProject.getId(), mockUser.getId());

        verify(projectRepository, times(1)).deleteById(mockProject.getId());
    }

    @Test
    void shouldUpdateProjectSuccessfully() throws Exception {
        Project updatedProject = new Project();
        updatedProject.setName("Updated Project");
        updatedProject.setDescription("Updated Description");

        when(projectRepository.findById(mockProject.getId())).thenReturn(Optional.of(mockProject));
        when(projectRepository.save(any(Project.class))).thenReturn(updatedProject);

        Project result = projectService.updateProject(updatedProject, mockProject.getId());

        assertNotNull(result);
        assertEquals("Updated Project", result.getName());
        assertEquals("Updated Description", result.getDescription());
    }
}
