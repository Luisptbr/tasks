package com.dev.tasks.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev.tasks.dto.TaskDTO;
import com.dev.tasks.model.Task;
import com.dev.tasks.model.TaskStatus;
import com.dev.tasks.service.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {
	@Autowired
	private TaskService service;

	//Criar task
	@PostMapping
	public Task create(@RequestBody TaskDTO dto) {
		return service.create(dto);
	}
	//Listar todas as tasks
	@GetMapping
	public List<Task>listAll() {
		return service.ListAll();
	}
	//Listar task por User
	@GetMapping("/user/{userId}")
	public List<Task>listByUser(@PathVariable Long userId){
		return service.listByUser(userId);
	}
	//Atualizar status
	@PutMapping("/{id}/status")
	public Task updateStatus(@PathVariable Long id, @RequestParam TaskStatus status) {
		return service.updateStatus(id, status);
	}
	//Atualizar Task
	@PutMapping("/{id}")
	public Task updateTask(@PathVariable Long id, @RequestBody TaskDTO dto) {
		return service.updateTask(id, dto);
	}
	
	//Deletar task
	@DeleteMapping("/{id}")
	public void delete (@PathVariable Long id) {
		service.delete(id);
	}
	
}
