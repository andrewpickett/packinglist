package com.profounddistortion.packinglist.config;

import com.profounddistortion.packinglist.model.ApplicationUser;
import com.profounddistortion.packinglist.model.PackingList;
import com.profounddistortion.packinglist.model.PackingListCategory;
import com.profounddistortion.packinglist.model.PackingListItem;
import com.profounddistortion.packinglist.repository.ApplicationUserRepo;
import com.profounddistortion.packinglist.repository.PackingListRepo;
import com.profounddistortion.packinglist.service.PackingListService;
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
//	private final PackingListRepo packingListRepo;
	private final PackingListService packingListService;

	@Autowired
	public DataLoader(ApplicationUserRepo userRepo, PackingListService packingListService) {
		this.userRepo = userRepo;
		this.packingListService = packingListService;
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
		saveBabySampleList();
		saveToddlerSampleList();
		saveAdultSampleList();
	}

	private void saveBabySampleList() {
		PackingList list = new PackingList();
		list.setName("Baby");

		PackingListCategory cat = new PackingListCategory();
		cat.setName("Diapering");
		cat.getItems().add(new PackingListItem("Diapers"));
		cat.getItems().add(new PackingListItem("Wipes"));
		cat.getItems().add(new PackingListItem("Changing Pads"));
		cat.getItems().add(new PackingListItem("Butt Paste/Aquaphor"));
		cat.getItems().add(new PackingListItem("Swim Diapers"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Feeding");
		cat.getItems().add(new PackingListItem("Pump"));
		cat.getItems().add(new PackingListItem("Bottles"));
		cat.getItems().add(new PackingListItem("Boppy Pillow"));
		cat.getItems().add(new PackingListItem("Burp Cloths"));
		cat.getItems().add(new PackingListItem("Sippy Cup"));
		cat.getItems().add(new PackingListItem("Bowls"));
		cat.getItems().add(new PackingListItem("Spoons"));
		cat.getItems().add(new PackingListItem("Bibs"));
		cat.getItems().add(new PackingListItem("Washcloths"));
		cat.getItems().add(new PackingListItem("Baby food/Cereal"));
		cat.getItems().add(new PackingListItem("Puffs/Cheerios"));
		cat.getItems().add(new PackingListItem("Highchair"));
		cat.getItems().add(new PackingListItem("Placemats"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Sleep");
		cat.getItems().add(new PackingListItem("Pack-n-play"));
		cat.getItems().add(new PackingListItem("Sheets"));
		cat.getItems().add(new PackingListItem("Blanket/Sleepsack"));
		cat.getItems().add(new PackingListItem("Book"));
		cat.getItems().add(new PackingListItem("Lovey"));
		cat.getItems().add(new PackingListItem("Pacifier"));
		cat.getItems().add(new PackingListItem("Sound Machine"));
		cat.getItems().add(new PackingListItem("Monitor (camera & base)"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Clothes");
		cat.getItems().add(new PackingListItem("Pajamas"));
		cat.getItems().add(new PackingListItem("Outfits"));
		cat.getItems().add(new PackingListItem("Socks"));
		cat.getItems().add(new PackingListItem("Shoes"));
		cat.getItems().add(new PackingListItem("Onesies"));
		cat.getItems().add(new PackingListItem("Bows/Headbands"));
		cat.getItems().add(new PackingListItem("Hats"));
		cat.getItems().add(new PackingListItem("Sunglasses"));
		cat.getItems().add(new PackingListItem("Swimsuits"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Play");
		cat.getItems().add(new PackingListItem("Toys"));
		cat.getItems().add(new PackingListItem("Teething toys"));
		cat.getItems().add(new PackingListItem("Play Mat/Blanket"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Bath");
		cat.getItems().add(new PackingListItem("Bathtub"));
		cat.getItems().add(new PackingListItem("Washcloth"));
		cat.getItems().add(new PackingListItem("Soap"));
		cat.getItems().add(new PackingListItem("Towels"));
		cat.getItems().add(new PackingListItem("Lotion/Coconut Oil"));
		cat.getItems().add(new PackingListItem("Brush"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Medical/Grooming");
		cat.getItems().add(new PackingListItem("Vitamins"));
		cat.getItems().add(new PackingListItem("Infant Tylenol/Ibuprofen"));
		cat.getItems().add(new PackingListItem("Nail Clippers"));
		cat.getItems().add(new PackingListItem("First Aid/Grooming Kit"));
		cat.getItems().add(new PackingListItem("Sunscreen"));
		cat.getItems().add(new PackingListItem("Toothbrush/toothpaste"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Travel");
		cat.getItems().add(new PackingListItem("Car Seat (Base)"));
		cat.getItems().add(new PackingListItem("Stroller"));
		cat.getItems().add(new PackingListItem("Moby/Backpack"));
		cat.getItems().add(new PackingListItem("Attachable toys"));
		cat.getItems().add(new PackingListItem("Attachable pacifier"));
		cat.getItems().add(new PackingListItem("ID"));
		cat.getItems().add(new PackingListItem("Diaper Bag (stocked)"));
		cat.getItems().add(new PackingListItem("Mosquito Net"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Miscellaneous");
		cat.getItems().add(new PackingListItem("Laundry Detergent"));
		cat.getItems().add(new PackingListItem("Pool Inflatable"));
		cat.getItems().add(new PackingListItem("Nightlight"));
		list.getCategories().add(cat);

		packingListService.createPackingList(null, list);
	}

	private void saveToddlerSampleList() {
		PackingList list = new PackingList();
		list.setName("Toddler");

		PackingListCategory cat = new PackingListCategory();
		cat.setName("Diapering/Potty");
		cat.getItems().add(new PackingListItem("Diapers"));
		cat.getItems().add(new PackingListItem("Wipes"));
		cat.getItems().add(new PackingListItem("Changing Pads"));
		cat.getItems().add(new PackingListItem("Butt Paste/Aquaphor"));
		cat.getItems().add(new PackingListItem("Swim Diapers"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Feeding");
		cat.getItems().add(new PackingListItem("Sippy Cup"));
		cat.getItems().add(new PackingListItem("Bowls/Plates"));
		cat.getItems().add(new PackingListItem("Silverware"));
		cat.getItems().add(new PackingListItem("Bibs"));
		cat.getItems().add(new PackingListItem("Washcloths"));
		cat.getItems().add(new PackingListItem("Food/Snacks"));
		cat.getItems().add(new PackingListItem("Highchair"));
		cat.getItems().add(new PackingListItem("Placemats"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Sleep");
		cat.getItems().add(new PackingListItem("Pack-n-play"));
		cat.getItems().add(new PackingListItem("Sheets"));
		cat.getItems().add(new PackingListItem("Blanket/Sleepsack"));
		cat.getItems().add(new PackingListItem("Book"));
		cat.getItems().add(new PackingListItem("Lovey"));
		cat.getItems().add(new PackingListItem("Pacifier"));
		cat.getItems().add(new PackingListItem("Sound Machine"));
		cat.getItems().add(new PackingListItem("Monitor (camera & base)"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Clothes");
		cat.getItems().add(new PackingListItem("Pajamas"));
		cat.getItems().add(new PackingListItem("Outfits"));
		cat.getItems().add(new PackingListItem("Socks"));
		cat.getItems().add(new PackingListItem("Shoes"));
		cat.getItems().add(new PackingListItem("Bows/Headbands"));
		cat.getItems().add(new PackingListItem("Hats"));
		cat.getItems().add(new PackingListItem("Sunglasses"));
		cat.getItems().add(new PackingListItem("Swimsuits"));
		cat.getItems().add(new PackingListItem("Underwear"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Play");
		cat.getItems().add(new PackingListItem("Toys"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Bath");
		cat.getItems().add(new PackingListItem("Washcloth"));
		cat.getItems().add(new PackingListItem("Soap"));
		cat.getItems().add(new PackingListItem("Towels"));
		cat.getItems().add(new PackingListItem("Lotion"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Medical/Grooming");
		cat.getItems().add(new PackingListItem("Vitamins"));
		cat.getItems().add(new PackingListItem("Infant Tylenol/Ibuprofen"));
		cat.getItems().add(new PackingListItem("Nail Clippers"));
		cat.getItems().add(new PackingListItem("First Aid/Grooming Kit"));
		cat.getItems().add(new PackingListItem("Sunscreen"));
		cat.getItems().add(new PackingListItem("Toothbrush/toothpaste"));
		cat.getItems().add(new PackingListItem("Hairbands"));
		cat.getItems().add(new PackingListItem("Brush"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Travel");
		cat.getItems().add(new PackingListItem("Car Seat"));
		cat.getItems().add(new PackingListItem("Stroller"));
		cat.getItems().add(new PackingListItem("Backpack"));
		cat.getItems().add(new PackingListItem("Attachable toys"));
		cat.getItems().add(new PackingListItem("Attachable pacifier"));
		cat.getItems().add(new PackingListItem("Birth Certificate"));
		cat.getItems().add(new PackingListItem("Diaper Bag (stocked)"));
		cat.getItems().add(new PackingListItem("Mosquito Net"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Miscellaneous");
		cat.getItems().add(new PackingListItem("Laundry Detergent"));
		cat.getItems().add(new PackingListItem("Pool Inflatable"));
		cat.getItems().add(new PackingListItem("Nightlight"));
		cat.getItems().add(new PackingListItem("Baby-proofing stuff"));
		cat.getItems().add(new PackingListItem("Swimming goggles/toys"));
		list.getCategories().add(cat);

		packingListService.createPackingList(null, list);
	}

	private void saveAdultSampleList() {
		PackingList list = new PackingList();
		list.setName("Adult");

		PackingListCategory cat = new PackingListCategory();
		cat.setName("Clothing");
		cat.getItems().add(new PackingListItem("Belts"));
		cat.getItems().add(new PackingListItem("Shoes (boots/slippers)"));
		cat.getItems().add(new PackingListItem("Socks"));
		cat.getItems().add(new PackingListItem("Pajamas"));
		cat.getItems().add(new PackingListItem("Underwear"));
		cat.getItems().add(new PackingListItem("Pants/Jeans"));
		cat.getItems().add(new PackingListItem("Skirts"));
		cat.getItems().add(new PackingListItem("Shirts/Sweaters"));
		cat.getItems().add(new PackingListItem("Dresses"));
		cat.getItems().add(new PackingListItem("Ties"));
		cat.getItems().add(new PackingListItem("Suit/Sportcoat"));
		cat.getItems().add(new PackingListItem("Pantyhose"));
		cat.getItems().add(new PackingListItem("Robe"));
		cat.getItems().add(new PackingListItem("Coats (raincoat)"));
		cat.getItems().add(new PackingListItem("Hats"));
		cat.getItems().add(new PackingListItem("Gloves"));
		cat.getItems().add(new PackingListItem("Scarves"));
		cat.getItems().add(new PackingListItem("Swimsuit"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Beauty/Grooming");
		cat.getItems().add(new PackingListItem("Body Lotion"));
		cat.getItems().add(new PackingListItem("Perfume/Cologne"));
		cat.getItems().add(new PackingListItem("Q-Tips"));
		cat.getItems().add(new PackingListItem("Deodorant"));
		cat.getItems().add(new PackingListItem("Toothpaste"));
		cat.getItems().add(new PackingListItem("Toothbrush"));
		cat.getItems().add(new PackingListItem("Floss"));
		cat.getItems().add(new PackingListItem("Mouthwash"));
		cat.getItems().add(new PackingListItem("Shampoo"));
		cat.getItems().add(new PackingListItem("Conditioner"));
		cat.getItems().add(new PackingListItem("Razor"));
		cat.getItems().add(new PackingListItem("Shaving Cream"));
		cat.getItems().add(new PackingListItem("Makeup"));
		cat.getItems().add(new PackingListItem("Tweezers"));
		cat.getItems().add(new PackingListItem("Face Wash/Towelettes"));
		cat.getItems().add(new PackingListItem("Hairdryer"));
		cat.getItems().add(new PackingListItem("Straightener/Curling Iron"));
		cat.getItems().add(new PackingListItem("Hairspray"));
		cat.getItems().add(new PackingListItem("Brush"));
		cat.getItems().add(new PackingListItem("Hairclips/bands"));
		cat.getItems().add(new PackingListItem("Manicure Items/Cotton squares"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Medical");
		cat.getItems().add(new PackingListItem("Sunscreen"));
		cat.getItems().add(new PackingListItem("Bugspray"));
		cat.getItems().add(new PackingListItem("Bandaids"));
		cat.getItems().add(new PackingListItem("Neosporin"));
		cat.getItems().add(new PackingListItem("Vitamins"));
		cat.getItems().add(new PackingListItem("Thermometer"));
		cat.getItems().add(new PackingListItem("Sanitary needs"));
		cat.getItems().add(new PackingListItem("Pain meds"));
		cat.getItems().add(new PackingListItem("Tums"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Special Clothing/Equipment for:");
		cat.getItems().add(new PackingListItem("Golf"));
		cat.getItems().add(new PackingListItem("Skiing"));
		cat.getItems().add(new PackingListItem("Horseback riding"));
		cat.getItems().add(new PackingListItem("Water Sports"));
		cat.getItems().add(new PackingListItem("Tennis"));
		list.getCategories().add(cat);

		cat = new PackingListCategory();
		cat.setName("Miscellaneous");
		cat.getItems().add(new PackingListItem("Camera (Charger)"));
		cat.getItems().add(new PackingListItem("Cell Chargers"));
		cat.getItems().add(new PackingListItem("Sunglasses"));
		cat.getItems().add(new PackingListItem("Umbrella"));
		cat.getItems().add(new PackingListItem("iPod/Speakers"));
		cat.getItems().add(new PackingListItem("Games/Cards"));
		cat.getItems().add(new PackingListItem("Pocket Knife"));
		cat.getItems().add(new PackingListItem("Laptop (Charger)"));
		cat.getItems().add(new PackingListItem("iPad (Charger)"));
		cat.getItems().add(new PackingListItem("Flashlight"));
		cat.getItems().add(new PackingListItem("Electric Converter"));
		cat.getItems().add(new PackingListItem("Detergent"));
		cat.getItems().add(new PackingListItem("Movies"));
		list.getCategories().add(cat);

		packingListService.createPackingList(null, list);
	}
}
