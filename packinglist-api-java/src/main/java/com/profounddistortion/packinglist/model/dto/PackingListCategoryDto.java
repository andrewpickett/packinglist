package com.profounddistortion.packinglist.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PackingListCategoryDto {
	private long id;
	private String name;
	private long listId;
	private final List<PackingListItemDto> items = new ArrayList<>();
}
