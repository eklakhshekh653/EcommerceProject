package Ecom.SecurityConfig;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.experimental.UtilityClass;

import java.util.Date;


public class JwtUtil {

    private static final String SECRET_KEY = "yourSecretKey"; // Replace with a strong key
    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
