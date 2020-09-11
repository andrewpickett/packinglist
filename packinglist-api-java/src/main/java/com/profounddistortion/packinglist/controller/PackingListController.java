package com.profounddistortion.packinglist.controller;

import com.profounddistortion.packinglist.model.ApplicationUser;
import com.profounddistortion.packinglist.model.PackingList;
import com.profounddistortion.packinglist.model.dto.PackingListDto;
import com.profounddistortion.packinglist.service.PackingListService;
import com.profounddistortion.packinglist.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@Slf4j
public class PackingListController {
	private final PackingListService plService;
	private final UserService userService;

	public PackingListController(final PackingListService plService, final UserService userService) {
		this.plService = plService;
		this.userService = userService;
	}

	@GetMapping("/lists")
	public List<PackingListDto> getLists() {
		ApplicationUser user = ApplicationUser.fromDto(userService.getUserFromJWTToken());
		log.debug("User {} attempting to get their lists.", user.getId());
		return plService.getPackingListsForUser(user).stream().map(PackingList::toDto).collect(Collectors.toList());
	}

	@GetMapping("/lists/{listId}")
	public PackingListDto getListById(@PathVariable long listId) {
		ApplicationUser user = ApplicationUser.fromDto(userService.getUserFromJWTToken());
		return plService.getPackingListById(user, listId).toDto();
	}

	@PostMapping("/lists")
	public PackingListDto createList(@RequestBody PackingListDto list) {
		ApplicationUser user = ApplicationUser.fromDto(userService.getUserFromJWTToken());
		log.debug("User {} creating a new list '{}'.", user.getId(), list.getName());
		return plService.createPackingList(user, PackingList.fromDto(list)).toDto();
	}

	@PutMapping("/lists/{listId}")
	public PackingListDto updateList(@PathVariable long listId, @RequestBody PackingListDto list) {
		ApplicationUser user = ApplicationUser.fromDto(userService.getUserFromJWTToken());
		return plService.updatePackingList(user, listId, PackingList.fromDto(list)).toDto();
	}
}
