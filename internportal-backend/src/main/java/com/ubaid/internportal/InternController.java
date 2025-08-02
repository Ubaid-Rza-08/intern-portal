package com.ubaid.internportal;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class InternController {

    @GetMapping("/api/intern-dashboard")
    public Intern getDashboard(@RequestParam(defaultValue = "Jane Doe") String name) {

        String referralCode = name.toLowerCase().replaceAll("\\s", "") + "2025";
        int donations = 1200 + (name.hashCode() % 1000);
        return new Intern(name, referralCode, donations);
    }

    @GetMapping("/api/leaderboard")
    public List<LeaderboardEntry> getLeaderboard() {
        return Arrays.asList(
                new LeaderboardEntry("Jane Doe", 2350),
                new LeaderboardEntry("John Smith", 2000),
                new LeaderboardEntry("Anita Desai", 1700),
                new LeaderboardEntry("Alice Lee", 1500),
                new LeaderboardEntry("Bob Kumar", 1200)
        );
    }
}
