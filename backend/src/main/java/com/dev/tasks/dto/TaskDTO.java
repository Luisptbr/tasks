package com.dev.tasks.dto;

import com.dev.tasks.model.TaskStatus;

public class TaskDTO {
	private String description;
	private Long userId;
	private TaskStatus status;
	
	//Getter & Setters
	public String getDescription() {
		return this.description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Long getUserId() {
		return this.userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public TaskStatus getStatus() {
		return this.status;
	}
	public void setStatus(TaskStatus status) {
		this.status = status;
	}
	
	
}
