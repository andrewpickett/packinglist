package com.profounddistortion.packinglist.service;

import com.profounddistortion.packinglist.model.dto.ApplicationUserDto;
import com.profounddistortion.packinglist.security.JwtAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
	public ApplicationUserDto getUserFromJWTToken() {
		JwtAuthenticationToken auth = (JwtAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

		ApplicationUserDto user = new ApplicationUserDto();
		user.setId(auth.getId());
		user.setAdmin(auth.isAdmin());
		user.setEmail(auth.getName());
		return user;
	}
}
