package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Tags;

import java.util.List;
import java.util.Optional;

public interface TagsService {
    Tags createTag(Tags tags);
    List<Tags> getAllTags();
    Optional<Tags> getTagById(Long id);
    Tags updateTag(Long id, Tags tagDetails);
    boolean deleteTag(Long id);
}
