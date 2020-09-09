package com.profounddistortion.packinglist.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.profounddistortion.packinglist.model.dto.ApplicationUserDto;
import com.profounddistortion.packinglist.security.JwtAuthenticationToken;
import com.profounddistortion.packinglist.security.JwtContainer;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JwtLoginFilter extends AbstractAuthenticationProcessingFilter {
	private JwtContainer jwtContainer;

	public JwtLoginFilter(String defaultFilterProcessesUrl, AuthenticationManager authenticationManager, JwtContainer jwtContainer) {
		super(defaultFilterProcessesUrl);
		setAuthenticationManager(authenticationManager);
		this.jwtContainer = jwtContainer;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException {
		ApplicationUserDto user = new ObjectMapper().readValue(request.getInputStream(), ApplicationUserDto.class);
		return getAuthenticationManager().authenticate(new JwtAuthenticationToken(user.getEmail(), user.getPassword(), Collections.emptyList()));
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth) {
		response.addHeader(HttpHeaders.WWW_AUTHENTICATE, JwtContainer.TOKEN_PREFIX.trim());
		response.addHeader(HttpHeaders.AUTHORIZATION, JwtAuthenticationToken.buildToken((JwtAuthenticationToken) auth, jwtContainer));
		if (((JwtAuthenticationToken) auth).isAdmin()) {
			response.addHeader("X-User-Admin", "true");
		}
	}
}
