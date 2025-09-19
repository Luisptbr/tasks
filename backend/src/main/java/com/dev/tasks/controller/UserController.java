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
import org.springframework.web.bind.annotation.RestController;

import com.dev.tasks.dto.UserDTO;
import com.dev.tasks.model.User;
import com.dev.tasks.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService service;
	
	//Criar usuário
	@PostMapping
	public User create(@RequestBody UserDTO dto) {
		return service.create(dto);
	}
	//Listar todos os usuários
	@GetMapping
	public List<User> findAll() {
		return service.findAll();
	}
	//Listar user po ID
	@GetMapping("/{id}")
	public User findById(@PathVariable Long id){
		return service.findById(id);
	}
	//Atualizar usuário/ updateUser
	@PutMapping("/{id}")
	public User update (@PathVariable Long id, @RequestBody UserDTO dto) {
		return service.update(id, dto);
	}
	//Delete usuário
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
