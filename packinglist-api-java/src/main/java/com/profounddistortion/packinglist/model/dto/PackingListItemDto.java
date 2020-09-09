package com.profounddistortion.packinglist.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PackingListItemDto {
	private long id;
	private String name;
	private long categoryId;
}
