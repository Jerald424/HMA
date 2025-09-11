package com.hma.hma_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hma.hma_backend.entity.TodoEntity;

public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

}
