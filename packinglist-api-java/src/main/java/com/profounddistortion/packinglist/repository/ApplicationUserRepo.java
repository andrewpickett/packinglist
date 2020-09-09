package com.profounddistortion.packinglist.repository;

import com.profounddistortion.packinglist.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationUserRepo extends JpaRepository<ApplicationUser, Long> {

	ApplicationUser findByEmail(String email);

}
