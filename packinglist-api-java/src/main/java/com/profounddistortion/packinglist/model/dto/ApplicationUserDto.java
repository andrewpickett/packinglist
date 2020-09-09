package com.profounddistortion.packinglist.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
public class ApplicationUserDto {
	private long id;
	private String email;
	private String password;
	private boolean admin;
	private String error;
	private final List<PackingListDto> lists = new ArrayList<>();
}
