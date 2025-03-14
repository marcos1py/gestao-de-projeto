package com.gestaoDeProjeto.backend.service;

import java.util.List;

import com.gestaoDeProjeto.backend.modal.Chat;
import com.gestaoDeProjeto.backend.modal.Project;
import com.gestaoDeProjeto.backend.modal.User;
import java.util.UUID;
import java.util.List;

public interface ProjectService {

    Project createProject(Project project, User user) throws Exception;

    List <Project> getProjectByTeam(User user,String category, String tag, String minDate, String maxDate) throws Exception;

    Project getProjectById(UUID projectId) throws Exception;

    void deleteProject(UUID projectId, UUID userId) throws Exception;

    Project updateProject(Project updatedProject, UUID id) throws Exception;

    void addUserToProject(UUID projectId, UUID userId) throws Exception;

    void removeUserFromProject(UUID projectId, UUID userId) throws Exception;

    Chat getChatByProjectId(UUID projectId) throws Exception;

    List<Project> searchProjects(String keyword,User user) throws Exception;
}