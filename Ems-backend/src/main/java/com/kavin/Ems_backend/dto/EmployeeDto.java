package com.kavin.Ems_backend.dto;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EmployeeDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;

}