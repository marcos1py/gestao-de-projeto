package com.gestaoDeProjeto.backend.config;

import java.text.CollationKey;
import java.util.Collection;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtProvider {
	static SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRETE_KEY.getBytes());	
	public static String generateToken(Authentication authentication) {

		String jwt = Jwts.builder().setIssuedAt(new Date())
									.setExpiration(new Date(new Date().getTime()+86400000))
									.claim("email",authentication.getName())
									.signWith(key)
									.compact();
		return jwt;
	}
	
	public static String getEmailFromToken(String jwt)
	{
		//It will come as Bearer and then token so we are removing bearer token
		jwt = jwt.substring(7);
		Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		String email = String.valueOf(claims.get("email"));
		return email;
	}
}