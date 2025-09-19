package com.dev.tasks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.tasks.dto.TaskDTO;
import com.dev.tasks.model.Task;
import com.dev.tasks.model.TaskStatus;
import com.dev.tasks.model.User;
import com.dev.tasks.repository.TaskRepository;
import com.dev.tasks.repository.UserRepository;

@Service
public class TaskService {
	@Autowired
	private TaskRepository taskRepo;
	@Autowired
	private UserRepository userRepo;
	
	//Criar task
	public Task create (TaskDTO dto) {
		User user = userRepo.findById(dto.getUserId()).orElseThrow();
		Task task = new Task();
		task.setDescription(dto.getDescription());
		task.setUser(user);
		task.setStatus(dto.getStatus() != null ? dto.getStatus() : TaskStatus.PENDENTE);
		return taskRepo.save(task);
	}
	
	//Listar todas as tasks
	public List<Task> ListAll(){
		return taskRepo.findAll();
	}
	
	//Listar task por usuário
	public List<Task> listByUser(Long userId){
		return taskRepo.findByUserId(userId);
	}
	
	//Atualizar status / updateStatus
	public Task updateStatus(Long id, TaskStatus status) {
		Task task = taskRepo.findById(id).orElseThrow();
		task.setStatus(status);
		return taskRepo.save(task);
	}
	//Atualizar task/ updateTask
	public Task updateTask(long id, TaskDTO dto) {
		Task task = taskRepo.findById(id).orElseThrow();
		
		if (dto.getDescription() != null) {
			task.setDescription(dto.getDescription());
		}
		if (dto.getStatus() != null) {
			task.setStatus(dto.getStatus());
		}
		if (dto.getUserId() != null) {
			User user = userRepo.findById(dto.getUserId()).orElseThrow();
			task.setUser(user);
		}
		return taskRepo.save(task);
	}
	//Delete
	public void delete(long id) {
		taskRepo.deleteById(id);
	}
}
