package com.profounddistortion.packinglist.repository;

import com.profounddistortion.packinglist.model.ApplicationUser;
import com.profounddistortion.packinglist.model.PackingList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PackingListRepo extends JpaRepository<PackingList, Long> {

	List<PackingList> findAllByUserOrderByNameAsc(ApplicationUser user);

	List<PackingList> findAllByUserIsNullOrderByNameAsc();

	List<PackingList> findAllByUserNullOrderByNameAsc();

	Optional<PackingList> findByUserAndId(ApplicationUser user, long id);

}
