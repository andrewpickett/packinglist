package com.profounddistortion.packinglist.repository;

import com.profounddistortion.packinglist.model.PackingListCategory;
import com.profounddistortion.packinglist.model.PackingListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackingListItemRepo extends JpaRepository<PackingListItem, Long> {

	List<PackingListItem> findAllByCategory(PackingListCategory category);

}
