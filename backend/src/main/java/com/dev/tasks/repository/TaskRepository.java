package com.dev.tasks.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.tasks.model.Task;

public interface TaskRepository extends JpaRepository<Task, Long>{
	List<Task> findByUserId(Long userId);
}
