package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Category;
import com.gestaoDeProjeto.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    // Criar nova categoria
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Listar todas as categorias
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Obter categoria por ID
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    // Atualizar categoria
    public Category updateCategory(Long id, Category categoryDetails) {
        Optional<Category> existingCategory = categoryRepository.findById(id);
        if (existingCategory.isPresent()) {
            Category category = existingCategory.get();
            category.setNome(categoryDetails.getNome());  // Atualiza o nome
            return categoryRepository.save(category);
        }
        return null; // Retorna null caso a categoria não seja encontrada
    }

    // Deletar categoria
    public boolean deleteCategory(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            categoryRepository.delete(category.get());
            return true;
        }
        return false; // Retorna false se a categoria não for encontrada
    }
}
