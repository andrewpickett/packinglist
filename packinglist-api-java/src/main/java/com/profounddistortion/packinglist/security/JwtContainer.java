package com.profounddistortion.packinglist.security;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

@Data
@Slf4j
public class JwtContainer {
	public static final String TOKEN_PREFIX = "Bearer ";

	private Key jwtSecretKey;
	private SignatureAlgorithm signatureAlgorithm;
	private int jwtExpirationTime;

	public JwtContainer(String key, SignatureAlgorithm signatureAlgorithm, int jwtExpirationTime) {
		this.signatureAlgorithm = signatureAlgorithm;
		this.jwtExpirationTime = jwtExpirationTime;

		byte[] decodedKey = Decoders.BASE64.decode(key);
		this.jwtSecretKey = new SecretKeySpec(decodedKey, 0, decodedKey.length, signatureAlgorithm.getJcaName());
	}
}
