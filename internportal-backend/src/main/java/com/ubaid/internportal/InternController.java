package com.ubaid.internportal;

import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class InternController {

    @GetMapping("/intern-dashboard")
    public Intern getDashboard(@RequestParam(defaultValue = "Jane Doe") String name) {

        String referralCode = name.toLowerCase().replaceAll("\\s", "") + "2025";
        int donations = 1200 + (name.hashCode() % 1000);
        return new Intern(name, referralCode, donations);
    }

    @GetMapping("/leaderboard")
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
