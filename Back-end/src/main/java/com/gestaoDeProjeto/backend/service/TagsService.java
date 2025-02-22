package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Tags;
import java.util.UUID;
import java.util.List;
import java.util.Optional;

public interface TagsService {
    Tags createTag(Tags tags);
    List<Tags> getAllTags();
    Optional<Tags> getTagById(UUID id);
    Tags updateTag(UUID id, Tags tagDetails);
    boolean deleteTag(UUID id);
}
