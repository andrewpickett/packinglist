package com.profounddistortion.packinglist.config;

import com.profounddistortion.packinglist.model.ApplicationUser;
import com.profounddistortion.packinglist.model.PackingList;
import com.profounddistortion.packinglist.repository.ApplicationUserRepo;
import com.profounddistortion.packinglist.repository.PackingListRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

@Profile("local")
@Component
@Slf4j
public class DataLoader implements ApplicationRunner {

	private final ApplicationUserRepo userRepo;
	private final PackingListRepo packingListRepo;

	@Autowired
	public DataLoader(ApplicationUserRepo userRepo, PackingListRepo packingListRepo) {
		this.userRepo = userRepo;
		this.packingListRepo = packingListRepo;
	}

	public void run(ApplicationArguments args) {
		saveUsers();
		saveSampleLists();
	}

	private void saveUsers() {
		ApplicationUser user = new ApplicationUser();
		user.setAdmin(true);
		user.setEmail("picketta@gmail.com");
		user.setPassword(BCrypt.hashpw("darkstar", BCrypt.gensalt()));
		log.debug("Inserting initial user: {}", user);
		userRepo.save(user);
	}

	private void saveSampleLists() {
		PackingList list = new PackingList();
		list.setName("Baby");
		packingListRepo.save(list);

		list = new PackingList();
		list.setName("Toddler");
		packingListRepo.save(list);

		list = new PackingList();
		list.setName("Adult");
		packingListRepo.save(list);
	}
}
