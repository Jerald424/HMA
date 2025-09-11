package com.hma.hma_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.hma.hma_backend.service.CustomUserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(HttpMethod.POST, "/api/users").permitAll()
                                                .requestMatchers("/api/users/**").authenticated()
                                                .anyRequest().authenticated())
                                .formLogin(form -> form
                                                .permitAll()
                                                .defaultSuccessUrl("/dashboard"))
                                .csrf(csrf -> csrf.disable());

                return http.build();
        }

        @Bean
        public UserDetailsService userDetailsService() {
                // UserDetails user = User.withUsername("user")
                // .password("{noop}password") // {noop} means no encoding
                // .roles("USER")
                // .build();

                // UserDetails admin = User.withUsername("admin")
                // .password("{noop}admin123")
                // .roles("ADMIN")
                // .build();

                // return new InMemoryUserDetailsManager(user, admin);
                return new CustomUserService();
        }

        @Bean
        public DaoAuthenticationProvider authenticationProvider() {
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                provider.setUserDetailsService(userDetailsService());
                provider.setPasswordEncoder(passwordEncoder());

                return provider;

        }

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}