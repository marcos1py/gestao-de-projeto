package com.gestaoDeProjeto.backend.modal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter

public class ProjectDTO {

    private String name;

    private String description;

    private List<String> tags;

    private String  category;



    // other fields and methods
    public String  getCategoria() {
        return category;
    }

    public void setCategoria(String  categoria) {
        this.category = categoria;
    }
}
