package com.ubaid.internportal;

import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Data
public class Intern {
    private String name;
    private String referralCode;
    private int donationsRaised;



    public Intern(String name, String referralCode, int score) {
        this.name = name;
        this.referralCode = referralCode;
        this.donationsRaised = donationsRaised;
    }

}
