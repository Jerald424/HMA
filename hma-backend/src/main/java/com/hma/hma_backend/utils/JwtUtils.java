package com.hma.hma_backend.utils;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    private static final String SECRET_KEY_STRING = "5F4638D866458B9BC64C6E6F57481";
    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512); // generates a secure 512-bit key

    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .subject(userDetails.getUsername())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(key, Jwts.SIG.HS256)
                .compact();
    }
}
