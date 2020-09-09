package com.profounddistortion.packinglist.model;

import com.profounddistortion.packinglist.model.dto.PackingListItemDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "packinglist_item")
public class PackingListItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "packinglist_category_id")
	private PackingListCategory category;

	public static PackingListItem fromDto(PackingListItemDto dto) {
		PackingListItem item = new PackingListItem();
		item.setId(dto.getId());
		item.setName(dto.getName());
		PackingListCategory category = new PackingListCategory();
		category.setId(dto.getCategoryId());
		item.setCategory(category);
		return item;
	}

	public PackingListItemDto toDto() {
		return new PackingListItemDto(getId(), getName(), getCategory().getId());
	}
}
