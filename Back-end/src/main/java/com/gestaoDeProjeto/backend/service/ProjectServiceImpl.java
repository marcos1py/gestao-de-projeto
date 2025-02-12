package com.gestaoDeProjeto.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import com.gestaoDeProjeto.backend.modal.Chat;
import com.gestaoDeProjeto.backend.modal.Project;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.repository.ProjectRepository;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;

    @Override
    public Project createProject(Project project, User user) throws Exception {

        Project createdProject = new Project();
        createdProject.setOwner(user);
        createdProject.setTags(project.getTags());
        createdProject.setName(project.getName());
        createdProject.setCategory(project.getCategory());
        createdProject.setCreatedAt(LocalDateTime.now());
        createdProject.setDescription(project.getDescription());
        createdProject.getTeam().add(user);

        Project savedProject = projectRepository.save(createdProject);

        Chat chat = new Chat();
        chat.setProject(savedProject);

        Chat projectChat = chatService.createChat(chat);
        savedProject.setChat(projectChat);

        return savedProject;
    }

    @Override
public List<Project> getProjectByTeam(User user, String category, String tag, String minDate, String maxDate) throws Exception {
    List<Project> projects = projectRepository.findByTeamContainingOrOwner(user, user);

    // Filtro por categoria
    if (category != null && !category.isEmpty()) {
        projects = projects.stream()
                .filter(project -> project.getCategory() != null 
                        && project.getCategory().getNome().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    // Filtro por tag
    if (tag != null && !tag.isEmpty()) {
        projects = projects.stream()
                .filter(project -> project.getTags() != null 
                        && project.getTags().stream()
                            .anyMatch(t -> t.getNome().equalsIgnoreCase(tag)))
                .collect(Collectors.toList());
    }

    // Filtro por data mínima (se informada)
    if (minDate != null && !minDate.isEmpty()) {
        LocalDate minLocalDate = LocalDate.parse(minDate); // formato esperado "yyyy-MM-dd"
        LocalDateTime minDateTime = minLocalDate.atStartOfDay();
        projects = projects.stream()
                .filter(project -> project.getCreatedAt() != null 
                        && !project.getCreatedAt().isBefore(minDateTime))
                .collect(Collectors.toList());
    }

    // Filtro por data máxima (se informada)
    if (maxDate != null && !maxDate.isEmpty()) {
        LocalDate maxLocalDate = LocalDate.parse(maxDate); // formato esperado "yyyy-MM-dd"
        // Considera o final do dia para incluir todos os projetos deste dia
        LocalDateTime maxDateTime = maxLocalDate.atTime(23, 59, 59);
        projects = projects.stream()
                .filter(project -> project.getCreatedAt() != null 
                        && !project.getCreatedAt().isAfter(maxDateTime))
                .collect(Collectors.toList());
    }

    return projects;
}
    
    

    @Override
    public Project getProjectById(Long projectId) throws Exception {

        Optional<Project> optionalProject = projectRepository.findById(projectId);

        if (optionalProject.isEmpty()){
            throw new Exception("Project not found!");
        }
        return optionalProject.get();
    }

    @Override
    public void deleteProject(Long projectId, Long userId) throws Exception {

        getProjectById(projectId);
        //userService.findUserById(userId);
        projectRepository.deleteById(projectId);
    }

    @Override
    public Project updateProject(Project updatedProject, Long id) throws Exception {

        Project project = getProjectById(id);

        project.setName(updatedProject.getName());
        project.setDescription(updatedProject.getDescription());
        project.setTags(updatedProject.getTags());

        return projectRepository.save(project);
    }

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {

        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);

        if (!project.getTeam().contains(user)){
            project.getChat().getUsers().add(user);
            project.getTeam().add(user);
        }
        projectRepository.save(project);
    }

    @Override
    public void removeUserFromProject(Long projectId, Long userId) throws Exception {

        Project project = getProjectById(projectId);
        User user = userService.findUserById(userId);

        if (project.getTeam().contains(user)){
            project.getChat().getUsers().remove(user);
            project.getTeam().remove(user);
        }
        projectRepository.save(project);
    }

    @Override
    public Chat getChatByProjectId(Long projectId) throws Exception {

        Project project = getProjectById(projectId);
        return project.getChat();
    }

    @Override
    public List<Project> searchProjects(String keyword, User user) throws Exception {

        return projectRepository.findByNameContainingAndTeamContains(keyword, user);
    }
}