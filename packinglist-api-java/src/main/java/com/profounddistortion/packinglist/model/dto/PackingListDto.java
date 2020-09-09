package com.profounddistortion.packinglist.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PackingListDto {
	private long id;
	private String name;
	private long userId;
	private final List<PackingListCategoryDto> categories = new ArrayList<>();
}
