package com.dev.tasks.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dev.tasks.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
