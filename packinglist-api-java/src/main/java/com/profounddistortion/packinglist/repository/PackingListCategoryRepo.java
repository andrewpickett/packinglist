package com.profounddistortion.packinglist.repository;

import com.profounddistortion.packinglist.model.PackingList;
import com.profounddistortion.packinglist.model.PackingListCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackingListCategoryRepo extends JpaRepository<PackingListCategory, Long> {

	List<PackingListCategory> findAllByList(PackingList list);

}
