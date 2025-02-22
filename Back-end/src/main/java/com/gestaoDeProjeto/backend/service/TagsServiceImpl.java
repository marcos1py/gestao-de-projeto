package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Tags;
import com.gestaoDeProjeto.backend.repository.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.UUID;
import java.util.List;
import java.util.Optional;

@Service
public class TagsServiceImpl implements TagsService {

    @Autowired
    private TagsRepository tagsRepository;

    @Override
    public Tags createTag(Tags tags) {
        return tagsRepository.save(tags);
    }

    @Override
    public List<Tags> getAllTags() {
        return tagsRepository.findAll();
    }

    @Override
    public Optional<Tags> getTagById(UUID id) {
        return tagsRepository.findById(id);
    }

    @Override
    public Tags updateTag(UUID id, Tags tagDetails) {
        Optional<Tags> existingTag = tagsRepository.findById(id);
        if (existingTag.isPresent()) {
            Tags tag = existingTag.get();
            tag.setNome(tagDetails.getNome());  // Atualiza o nome
            return tagsRepository.save(tag);
        }
        return null; // Retorna null caso a tag não seja encontrada
    }

    @Override
    public boolean deleteTag(UUID id) {
        Optional<Tags> tag = tagsRepository.findById(id);
        if (tag.isPresent()) {
            tagsRepository.delete(tag.get());
            return true;
        }
        return false; // Retorna false se a tag não foi encontrada
    }
}
