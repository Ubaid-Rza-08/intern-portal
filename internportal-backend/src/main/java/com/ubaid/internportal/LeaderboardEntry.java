package com.ubaid.internportal;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Data
public class LeaderboardEntry {
    private String name;
    private int donationsRaised;

    public LeaderboardEntry(String name, int donationsRaised) {
        this.name = name;
        this.donationsRaised = donationsRaised;
    }

}
