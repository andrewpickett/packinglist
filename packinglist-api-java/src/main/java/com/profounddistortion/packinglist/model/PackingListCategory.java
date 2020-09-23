package com.profounddistortion.packinglist.model;

import com.profounddistortion.packinglist.model.dto.PackingListCategoryDto;
import com.profounddistortion.packinglist.model.dto.PackingListItemDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "packinglist_category")
public class PackingListCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	@OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "category", cascade = CascadeType.ALL)
	private final List<PackingListItem> items = new ArrayList<>();
	@JoinColumn(name = "packinglist_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private PackingList list;

	public static PackingListCategory fromDto(PackingListCategoryDto dto) {
		PackingListCategory category = new PackingListCategory();
		category.setId(dto.getId());
		category.setName(dto.getName());
		PackingList list = new PackingList();
		list.setId(dto.getListId());
		category.setList(list);
		for (PackingListItemDto i : dto.getItems()) {
			category.getItems().add(PackingListItem.fromDto(i));
		}
		return category;
	}

	public PackingListCategoryDto toDto() {
		PackingListCategoryDto dto = new PackingListCategoryDto(getId(), getName(), getList().getId());
		for (PackingListItem i : getItems()) {
			dto.getItems().add(i.toDto());
		}
		return dto;
	}
}
