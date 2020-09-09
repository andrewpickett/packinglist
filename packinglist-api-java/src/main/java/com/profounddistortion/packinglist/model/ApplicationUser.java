package com.profounddistortion.packinglist.model;

import com.profounddistortion.packinglist.model.dto.ApplicationUserDto;
import com.profounddistortion.packinglist.model.dto.PackingListCategoryDto;
import com.profounddistortion.packinglist.model.dto.PackingListDto;
import lombok.AllArgsConstructor;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "application_user")
public class ApplicationUser {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String email;
	private String password;
	private boolean admin;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private final List<PackingList> lists = new ArrayList<>();

	public static ApplicationUser fromDto(ApplicationUserDto dto) {
		ApplicationUser user = new ApplicationUser();
		user.setId(dto.getId());
		user.setEmail(dto.getEmail());
		user.setAdmin(dto.isAdmin());
		for (PackingListDto l : dto.getLists()) {
			user.getLists().add(PackingList.fromDto(l));
		}
		return user;
	}

	public ApplicationUserDto toDto() {
		ApplicationUserDto dto = new ApplicationUserDto(getId(), getEmail(), getEmail(), isAdmin(), null);
		for (PackingList l : getLists()) {
			dto.getLists().add(l.toDto());
		}
		return dto;
	}
}
