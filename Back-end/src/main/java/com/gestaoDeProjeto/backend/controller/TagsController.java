package com.gestaoDeProjeto.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.gestaoDeProjeto.backend.modal.Project;
import com.gestaoDeProjeto.backend.modal.Tags;
import com.gestaoDeProjeto.backend.modal.User;
import com.gestaoDeProjeto.backend.service.TagsService;
import com.gestaoDeProjeto.backend.service.UserService;

@RestController
@RequestMapping("/api/tags")
public class TagsController {

    @Autowired
    private TagsService tagsService;

    @Autowired
    private UserService userService;



    // Criar Tag
    @PostMapping
    public ResponseEntity<Tags> createTag(
        @RequestBody Tags tag, 
        @RequestHeader("Authorization")String jwt) throws Exception {
        try {
            User user = userService.findUserProfileByJwt(jwt);
            Tags createdTag = tagsService.createTag(tag);
            return new ResponseEntity<>(createdTag, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Listar todas as Tags
    @GetMapping
    public ResponseEntity<Iterable<Tags>> getAllTags(
        @RequestHeader("Authorization")String jwt) throws Exception{
        try {
            User user = userService.findUserProfileByJwt(jwt);
            Iterable<Tags> tags = tagsService.getAllTags();
            return new ResponseEntity<>(tags, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Obter Tag por ID
    @GetMapping("/{id}")
    public ResponseEntity<Tags> getTagById(@PathVariable Long id, 
    @RequestHeader("Authorization")String jwt) throws Exception
     {
        try {
            User user = userService.findUserProfileByJwt(jwt);
            Optional<Tags> tagOptional = tagsService.getTagById(id);
            if (tagOptional.isPresent()) {
                return new ResponseEntity<>(tagOptional.get(), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Atualizar Tag
    @PatchMapping("/{id}")
    public ResponseEntity<Tags> updateTag(@PathVariable Long id, @RequestBody Tags tag, 
    @RequestHeader("Authorization")String jwt) throws Exception
    {
        try {
            User user = userService.findUserProfileByJwt(jwt);
            Tags updatedTag = tagsService.updateTag(id, tag);
            return new ResponseEntity<>(updatedTag, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    // Deletar Tag
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable Long id, 
    @RequestHeader("Authorization")String jwt) throws Exception
     {
        try {
            User user = userService.findUserProfileByJwt(jwt);
            tagsService.deleteTag(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
}
