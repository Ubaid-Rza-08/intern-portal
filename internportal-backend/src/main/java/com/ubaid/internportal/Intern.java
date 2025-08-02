package com.ubaid.internportal;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
public class Intern {
    private String name;
    private String referralCode;
    private int donationsRaised;
}
