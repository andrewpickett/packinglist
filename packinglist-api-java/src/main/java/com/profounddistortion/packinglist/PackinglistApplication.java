package com.profounddistortion.packinglist;

import com.profounddistortion.packinglist.security.JwtContainer;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@SpringBootApplication
public class PackinglistApplication {

	public static void main(String[] args) {
		SpringApplication.run(PackinglistApplication.class, args);
	}

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
			.select()
			.apis(RequestHandlerSelectors.basePackage("com.profounddistortion.packinglist"))
			.paths(PathSelectors.any())
			.build();
	}

	@Bean
	public JwtContainer jwtContainer(@Value("${jwt.secret.key}") String key, @Value("${jwt.secret.algo}") String algorithm, @Value("${jwt.expire.millis:1800000}") int jwtExpirationTime) {
		return new JwtContainer(key, SignatureAlgorithm.forName(algorithm), jwtExpirationTime);
	}
}
