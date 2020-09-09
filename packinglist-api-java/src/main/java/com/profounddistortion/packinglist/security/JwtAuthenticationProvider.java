package com.profounddistortion.packinglist.security;

import com.profounddistortion.packinglist.model.ApplicationUser;
import com.profounddistortion.packinglist.repository.ApplicationUserRepo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
@Getter
@Setter
public class JwtAuthenticationProvider implements AuthenticationProvider {
	private final ApplicationUserRepo userRepo;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		JwtAuthenticationToken tokenIn = (JwtAuthenticationToken) authentication;

		String name = tokenIn.getName();
		String pw = (String) tokenIn.getCredentials();
		ApplicationUser applicationUser = userRepo.findByEmail(name);
		if (applicationUser == null || !BCrypt.checkpw(pw, applicationUser.getPassword())) {
			throw new UsernameNotFoundException(name);
		}
		String roleName = applicationUser.isAdmin() ? "ROLE_ADMIN" : "ROLE_USER";
		return new JwtAuthenticationToken(applicationUser.getId(), applicationUser.getEmail(), applicationUser.getPassword(), Collections.singletonList(new SimpleGrantedAuthority(roleName)));
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return (JwtAuthenticationToken.class.isAssignableFrom(authentication));
	}
}
