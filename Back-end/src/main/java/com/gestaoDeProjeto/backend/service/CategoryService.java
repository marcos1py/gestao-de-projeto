package com.gestaoDeProjeto.backend.service;

import com.gestaoDeProjeto.backend.modal.Category;
import java.util.UUID;
import java.util.List;
import java.util.Optional;

public interface CategoryService {
    Category createCategory(Category category);
    List<Category> getAllCategories();
    Optional<Category> getCategoryById(UUID id);
    Optional<Category> getCategoryByName(String name); // Novo método
    Category updateCategory(UUID id, Category categoryDetails);
    boolean deleteCategory(UUID id);
}
