package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Tags;
import com.gestaoDeProjeto.backend.repository.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TagsService {

    @Autowired
    private TagsRepository tagsRepository;

    // Criar nova tag
    public Tags createTag(Tags tags) {
        return tagsRepository.save(tags);
    }

    // Listar todas as tags
    public List<Tags> getAllTags() {
        return tagsRepository.findAll();
    }

    // Obter tag por ID
    public Optional<Tags> getTagById(Long id) {
        return tagsRepository.findById(id);
    }

    // Atualizar tag
    public Tags updateTag(Long id, Tags tagDetails) {
        Optional<Tags> existingTag = tagsRepository.findById(id);
        if (existingTag.isPresent()) {
            Tags tag = existingTag.get();
            tag.setNome(tagDetails.getNome());  // Atualiza o nome
            return tagsRepository.save(tag);
        }
        return null; // Retorna null caso a tag não seja encontrada
    }

    // Deletar tag
    public boolean deleteTag(Long id) {
        Optional<Tags> tag = tagsRepository.findById(id);
        if (tag.isPresent()) {
            tagsRepository.delete(tag.get());
            return true;
        }
        return false; // Retorna false se a tag não foi encontrada
    }
}
