package com.hma.hma_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class Dashboard {

    @GetMapping
    public String getDashboard() {
        return "HELLO DASHBOARD";
    }
}