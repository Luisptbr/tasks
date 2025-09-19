package com.dev.tasks.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dev.tasks.dto.UserDTO;
import com.dev.tasks.model.User;
import com.dev.tasks.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository repo;
	//Criar usuario
	public User create (UserDTO dto) {
		User user = new User();
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		user.setPassword(dto.getPassword());
		return repo.save(user);
	}
	//Listar todos os usuários
	public List<User> findAll() {
		return repo.findAll();
	}
	//Listar user por ID
	public User findById(Long id) {
		return repo.findById(id).orElseThrow();
	}
	//Atualizar user
	public User update(Long id, UserDTO dto) {
		User user = repo.findById(id).orElseThrow();
		user.setName(dto.getName());
		user.setEmail(dto.getEmail());
		//user.setPassword(dto.getPassword());
		return repo.save(user);
	}
	public void delete (Long id) {
		repo.deleteById(id);
	}
}
