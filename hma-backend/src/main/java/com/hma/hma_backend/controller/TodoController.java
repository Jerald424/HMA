package com.hma.hma_backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.hma.hma_backend.entity.TodoEntity;
import com.hma.hma_backend.repository.TodoRepository;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private TodoRepository todoRepository;

    public TodoController(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    @PostMapping
    public TodoEntity createTodo(@RequestBody TodoEntity todo) {
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public TodoEntity updateTodo(@PathVariable Long id, @RequestBody TodoEntity todo) {
        TodoEntity existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescription(todo.getDescription());
        existingTodo.setStatus(todo.getStatus());
        return todoRepository.save(existingTodo);

    }

    @GetMapping
    public List<TodoEntity> getAllTodos() {
        return todoRepository.findAll();
    }

    @GetMapping("/{id}")
    public TodoEntity getTodo(@PathVariable Long id) {
        return todoRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public String deleteTodo(@PathVariable Long id) {
        todoRepository.deleteById(id);
        return "Todo deleted";
    }
}
