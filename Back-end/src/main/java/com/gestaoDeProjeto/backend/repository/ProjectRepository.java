package com.gestaoDeProjeto.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.gestaoDeProjeto.backend.modal.Project;
import com.gestaoDeProjeto.backend.modal.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List <Project> findByOwner(User user);
	List<Project> findByNameContainingAndTeamContains(String partialName,User user);

    @Query("SELECT p FROM Project p join p.team t where t=:user")
    List <Project> findProjectByTeam(@Param("user")User user);

    @Query("SELECT DISTINCT p FROM Project p JOIN p.tags t WHERE t.nome LIKE %:keyword%")
    List<Project> searchProjectsByTagName(@Param("keyword") String keyword);
    
    List <Project> findByTeamContainingOrOwner(User user, User owner);

    @Query("""
        SELECT DISTINCT p
        FROM Project p
        LEFT JOIN p.tags t
        WHERE (:category IS NULL OR p.category = :category)
          AND (:tag IS NULL OR t.nome LIKE %:tag%)
          AND (:user MEMBER OF p.team OR p.owner = :user)
    """)
    List<Project> findProjectsByFilters(
        @Param("category") String category,
        @Param("tag") String tag,
        @Param("user") User user
    );
    

}