package com.ubaid.internportal;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class LeaderboardEntry {
    private String name;
    private int donationsRaised;
}
