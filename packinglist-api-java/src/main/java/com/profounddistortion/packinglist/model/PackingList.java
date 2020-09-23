package com.profounddistortion.packinglist.model;

import com.profounddistortion.packinglist.model.dto.PackingListCategoryDto;
import com.profounddistortion.packinglist.model.dto.PackingListDto;
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
@Table(name = "packing_list")
public class PackingList {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String name;
	@OneToMany(fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "list", cascade = CascadeType.ALL)
	private final List<PackingListCategory> categories = new ArrayList<>();
	@JoinColumn(name = "application_user_id")
	@ManyToOne(fetch = FetchType.LAZY)
	private ApplicationUser user;

	public static PackingList fromDto(PackingListDto dto) {
		PackingList list = new PackingList();
		list.setId(dto.getId());
		list.setName(dto.getName());
		ApplicationUser user = new ApplicationUser();
		user.setId(dto.getUserId());
		list.setUser(user);
		for (PackingListCategoryDto c : dto.getCategories()) {
			list.getCategories().add(PackingListCategory.fromDto(c));
		}
		return list;
	}

	public PackingListDto toDto() {
		PackingListDto dto = new PackingListDto(getId(), getName(), getUser() == null ? -1 : getUser().getId());
		for (PackingListCategory c : getCategories()) {
			dto.getCategories().add(c.toDto());
		}
		return dto;
	}
}
