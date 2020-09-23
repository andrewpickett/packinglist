package com.profounddistortion.packinglist.service;

import com.profounddistortion.packinglist.exception.NotFoundException;
import com.profounddistortion.packinglist.model.ApplicationUser;
import com.profounddistortion.packinglist.model.PackingList;
import com.profounddistortion.packinglist.model.PackingListCategory;
import com.profounddistortion.packinglist.model.PackingListItem;
import com.profounddistortion.packinglist.repository.PackingListCategoryRepo;
import com.profounddistortion.packinglist.repository.PackingListItemRepo;
import com.profounddistortion.packinglist.repository.PackingListRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PackingListService {
	private final PackingListRepo listRepo;
	private final PackingListCategoryRepo categoryRepo;
	private final PackingListItemRepo itemRepo;

	public List<PackingList> getPackingListsForUser(ApplicationUser user) {
		return listRepo.findAllByUserOrderByNameAsc(user);
	}

	public List<PackingList> getPackingListSamples() {
		return listRepo.findAllByUserNullOrderByNameAsc();
	}

	public PackingList getPackingListSampleById(long id) {
		List<PackingList> samples = getPackingListSamples();
		for (PackingList sample : samples) {
			if (sample.getId() == id) {
				return sample;
			}
		}
		throw new NotFoundException();
	}

	public PackingList getPackingListById(ApplicationUser user, long id) {
		return listRepo.findByUserAndId(user, id).orElseThrow(NotFoundException::new);
	}

	public PackingList createPackingList(ApplicationUser user, PackingList list) {
		list.setUser(user);
		for (PackingListCategory category : list.getCategories()) {
			for (PackingListItem item : category.getItems()) {
				item.setCategory(category);
			}
			category.setList(list);
		}
		return listRepo.save(list);
	}

	public PackingList updatePackingList(ApplicationUser user, long listId, PackingList list) {
		if (list.getUser().getId() != user.getId() || list.getId() != listId) {
			throw new AccessDeniedException("You do not have access to update this list.");
		}
		for (PackingListCategory category : list.getCategories()) {
			for (PackingListItem item : category.getItems()) {
				item.setCategory(category);
			}
			category.setList(list);
		}
		return listRepo.save(list);
	}

	public void deletePackingList(ApplicationUser user, long listId) {
		PackingList list = getPackingListById(user, listId);
		if (list == null) {
			throw new AccessDeniedException("You do not have access to update this list.");
		}
		listRepo.deleteById(listId);
	}
}
