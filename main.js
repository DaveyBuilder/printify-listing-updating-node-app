const {
  updateCanadaSkus,
  createNewCountryListing,
  fetchAllListings,
} = require("./helper_functions");

const getRequiredListings = require("./get_required_listings");
const deleteListings = require("./delete_listings");

const fs = require("fs").promises;

const new_ids = {
  UK: [
    11812, 11813, 11814, 11815, 11816, 11818, 11819, 11820, 11821, 11822, 11830,
    11831, 11832, 11833, 11834, 11836, 11837, 11838, 11839, 11840, 11842, 11843,
    11844, 11845, 11846, 11848, 11849, 11850, 11851, 11852, 11853, 11866, 11867,
    11868, 11869, 11870, 11871, 11872, 11873, 11874, 11875, 11876, 11877, 11884,
    11885, 11886, 11887, 11888, 11890, 11891, 11892, 11893, 11894, 11895, 11896,
    11897, 11898, 11899, 11900, 11901, 11902, 11903, 11904, 11905, 11906, 11907,
    11938, 11939, 11940, 11941, 11942, 11943, 11944, 11945, 11946, 11947, 11948,
    11949, 11950, 11951, 11952, 11953, 11954, 11955, 11956, 11957, 11958, 11959,
    11960, 11961, 11962, 11963, 11964, 11965, 11966, 11967, 11968, 11969, 11970,
    11971, 11972, 11974, 11975, 11976, 11977, 11978, 11979, 11980, 11981, 11982,
    11983, 11984, 11986, 11987, 11988, 11989, 11990, 11991, 12004, 12005, 12006,
    12007, 12008, 12010, 12011, 12012, 12013, 12014, 12016, 12017, 12018, 12019,
    12020, 12021, 12022, 12023, 12024, 12025, 12026, 12027, 12028, 12029, 12030,
    12031, 12032, 12033, 12034, 12035, 12036, 12037, 12038, 12046, 12047, 12048,
    12049, 12050, 12052, 12053, 12054, 12055, 12056, 12057, 12058, 12059, 12060,
    12061, 12062, 12064, 12065, 12066, 12067, 12068, 12070, 12071, 12072, 12073,
    12074, 12075, 12088, 12089, 12090, 12091, 12092, 12094, 12095, 12096, 12097,
    12098, 12100, 12101, 12102, 12103, 12104, 12105, 12106, 12107, 12108, 12109,
    12110, 12111, 12112, 12113, 12114, 12115, 12116, 12118, 12119, 12120, 12121,
    12122, 12123, 12124, 12125, 12126, 12127, 12128, 12129, 12130, 12131, 12132,
    12133, 12134, 12136, 12137, 12138, 12139, 12140, 12141, 12142, 12143, 12144,
    12145, 12146, 12147, 12148, 12149, 12150, 12151, 12152, 12154, 12155, 12156,
    12157, 12158, 12166, 12167, 12168, 12169, 12170, 12172, 12173, 12174, 12175,
    12176, 12178, 12179, 12180, 12181, 12182, 12184, 12185, 12186, 12187, 12188,
    12190, 12191, 12192, 12193, 12194, 12195, 12196, 12197, 12198, 12199, 12200,
    12208, 12209, 12210, 12211, 12212, 23947, 23955, 23963, 23965, 23981, 23983,
    23985, 23989, 23993, 24003, 24005, 24007, 24015, 24021, 24031, 24039, 24045,
    24060, 24081, 24088, 24097, 24099, 24114, 24116, 24118, 24122, 24126, 24136,
    24138, 24140, 24147, 24153, 24164, 24171, 24178, 24194,
  ],
  EU: [
    11872, 11873, 11874, 11875, 11876, 11896, 11897, 11898, 11899, 11900, 11902,
    11903, 11904, 11905, 11906, 11907, 11950, 11951, 11952, 11953, 11954, 11956,
    11957, 11958, 11959, 11960, 11962, 11963, 11964, 11965, 11966, 11974, 11975,
    11976, 11977, 11978, 11979, 11980, 11981, 11982, 11983, 11984, 11986, 11987,
    11988, 11989, 11990, 11991, 12010, 12011, 12012, 12013, 12014, 12016, 12017,
    12018, 12019, 12020, 12021, 12022, 12023, 12024, 12025, 12026, 12027, 12028,
    12029, 12030, 12031, 12032, 12033, 12052, 12053, 12054, 12055, 12056, 12057,
    12070, 12071, 12072, 12073, 12074, 12100, 12101, 12102, 12103, 12104, 12105,
    12124, 12125, 12126, 12127, 12128, 12129, 12142, 12143, 12144, 12145, 12146,
    12148, 12149, 12150, 12151, 12152, 12190, 12191, 12192, 12193, 12194, 12195,
    23993, 24005, 24007, 24031, 24039, 24126, 24138, 24140, 24164, 24171, 42716,
    42717, 42718, 42719, 42720, 42721,
  ],
};

// *****MOVED BELOW BLOCKS OUTSIDE OF FUNCTION BECAUSE NOT BEING USED
// 1. The below block of code was ran to get all of the listings that are eligible for conversion
// const requiredListings = await getRequiredListings();
// return;
// console.log("All listings fetched from Printify");

// 2. The below block was ran to write a .csv file of the eligible listing titles for review
// let listings;
// try {
//   const data = await fs.readFile("listingsForConversion(new).json", "utf8"); // Read the file as a UTF-8 encoded string
//   listings = JSON.parse(data); // Parse the JSON string back into an object
//   console.log(`Listings loaded: ${listings.length}`);
// } catch (error) {
//   console.error("Error reading file:", error);
// }
// // Writing a .csv file of the eligible listing titles for review
// try {
//   // Extract titles and format them as CSV
//   const titles = listings.map((listing) => `"${listing.title}"`).join("\n");
//   // Write the CSV data to a file
//   await fs.writeFile("titles(new).csv", titles);
// } catch (error) {
//   console.error("Error writing file:", error);
// }

async function executeMainLogic() {
  // FETCH ALL LISTINGS FOR DISPLAY BLOCK
  // let allProductsData = [];
  // let currentPage = 1;
  // let lastPage = null;
  // do {
  //   console.log(`Current page: ${currentPage}`);
  //   const response = await fetchAllListings(currentPage);
  //   console.log(`Current page contains ${response.data.length} listings`);
  //   allProductsData.push(...response.data);
  //   currentPage = response.current_page + 1;
  //   lastPage = response.last_page;
  //   console.log(
  //     `All products array length now ${allProductsData.length} listings`
  //   );
  //   console.log(`Last page: ${lastPage}`);
  // } while (currentPage <= 1); //lastPage);
  // return allProductsData;

  //DELETION SECTION//////
  let deletionResult;
  try {
    const data = await fs.readFile("successfulListings.json", "utf8"); // Read the file as a UTF-8 encoded string
    let readData = JSON.parse(data); // Parse the JSON string back into an object
    console.log(`Listings loaded: ${readData.length}`);
    const idsForDeletion = readData.map((listing) => listing.new_id);
    console.log(`Ids for deletion: ${idsForDeletion}`);
    deletionResult = await deleteListings(idsForDeletion);
  } catch (error) {
    console.error("Error reading file:", error);
  }

  //return deletionResult;
  return;

  // 3. Now for the conversion
  // First read the listingsForConversion.json file
  let createdProductTemplatesForReturning = [];
  let failedProductIDs = [];
  let successfulProductIds = [];
  let skippedListings = [];
  let listings;
  try {
    const data = await fs.readFile("listingsForConversion(new).json", "utf8"); // Read the file as a UTF-8 encoded string
    listings = JSON.parse(data); // Parse the JSON string back into an object
    console.log(`Listings loaded: ${listings.length}`);
  } catch (error) {
    console.error("Error reading file:", error);
  }

  //return listings[0];

  let counter = 0;
  for (const listing of listings) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    counter++;
    let country;
    let newPrintProviderId;
    if (listing.print_provider_id === 6) {
      country = "UK";
      newPrintProviderId = 72;
    } else if (listing.print_provider_id === 26) {
      country = "EU";
      newPrintProviderId = 30;
    } else {
      console.log(`Skipping listing, no country match: ${listing.title}`);
      skippedListings.push(
        `Skipping listing, no country match: ${listing.title}`
      );
      continue; // Skip to the next iteration of the loop
    }

    // First delete the listing from Printify

    //Then create the new listing details

    //Create the new large variants array
    let variantsArrayForThisListing = [];
    for (let existingVariant of listing.variants) {
      if (new_ids[country].includes(existingVariant.id)) {
        let variant_object = {
          id: existingVariant.id,
          //sku: existingVariant.sku,
          price: existingVariant.price,
          is_enabled: existingVariant.is_enabled,
        };
        variantsArrayForThisListing.push(variant_object);
      }
    }

    // Create the new print areas
    let newPrintAreas = listing.print_areas.map((printArea) => {
      let newPlaceholders = printArea.placeholders
        .filter(
          (placeholder) =>
            placeholder.images.length > 0 && placeholder.position !== "neck"
        )
        .map((placeholder) => {
          // Create a deep copy of the placeholder
          return JSON.parse(JSON.stringify(placeholder));
        });

      // Need to check if the variant_ids are in allVariantIDs
      // And only if they are, then add them to the newPrintAreas.variant_ids
      let eligible_variant_ids = [];
      for (const variant_id of printArea.variant_ids) {
        if (new_ids[country].includes(variant_id)) {
          eligible_variant_ids.push(variant_id);
        }
      }

      return {
        variant_ids: eligible_variant_ids,
        placeholders: newPlaceholders,
      };
    });

    // Now adjust the scale & x/y co-ords of the design so it is positioned in the same place on the new print provider print area
    //'can' means original
    // Put the pre-existing listing print area dimensions here
    let canPrintAreaWidth;
    let canPrintAreaHeight;
    let canCollarDistance;
    if (country === "UK") {
      canPrintAreaWidth = 4500;
      canPrintAreaHeight = 5700;
      canCollarDistance = 124;
    } else if (country === "EU") {
      canPrintAreaWidth = 4606;
      canPrintAreaHeight = 5787;
      canCollarDistance = 119;
    }

    for (printArea of newPrintAreas) {
      for (const placeholder of printArea.placeholders) {
        let printAreaWidth;
        let printAreaHeight;
        let thisCollarDistance;
        // Put the new print provider print dimensions here
        if (country === "UK") {
          printAreaWidth = 4500;
          printAreaHeight = 5100;
          thisCollarDistance = 585;
        } else if (country === "EU") {
          printAreaWidth = 4200;
          printAreaHeight = 4800;
          thisCollarDistance = 586;
        }
        ///////////////////////////
        let canadaScale = placeholder.images[0].scale;
        let targetWidthInPixels = canPrintAreaWidth * canadaScale;
        let newScale = targetWidthInPixels / printAreaWidth;
        placeholder.images[0].scale = newScale;
        // Now calculate Y co-ordinate
        //Calculate Canada positioning
        let canValueY = placeholder.images[0].y;
        let canPixelsFromTopOfPrintArea = canPrintAreaHeight * canValueY;
        let canPixelsFromBottomOfCollar =
          canPixelsFromTopOfPrintArea + canCollarDistance;
        // Now work out what the positioning should be
        let pixelsFromTopOfPrintArea =
          canPixelsFromBottomOfCollar - thisCollarDistance;
        let valueY = pixelsFromTopOfPrintArea / printAreaHeight;
        placeholder.images[0].y = valueY;
      }
    }

    let newProductTemplate = {
      title: listing.title,
      description: listing.description,
      blueprint_id: listing.blueprint_id,
      print_provider_id: newPrintProviderId,
      variants: variantsArrayForThisListing,
      print_areas: newPrintAreas,
    };

    createdProductTemplatesForReturning.push(newProductTemplate);

    try {
      let createdProductID = await createNewCountryListing(newProductTemplate);
      console.log(
        `Creation of listing ${listing.title} was ${
          createdProductID ? "successful" : "unsuccessful"
        }`
      );
      if (!createdProductID) {
        failedProductIDs.push({
          title: listing.title,
          original_id: listing.id,
        });
      } else {
        successfulProductIds.push({
          title: listing.title,
          original_id: listing.id,
          new_id: createdProductID,
        });
      }
    } catch (error) {
      console.error(error);
      console.error(`Error in catch block when creating ${listing.title}`);
      failedProductIDs.push({
        title: listing.title,
        id: listing.id,
      });
    }

    // if (counter >= 20) {
    //   break;
    // }
  }

  console.log("Completed main process");
  // console.log(`Failed product ids:`);
  // console.log(failedProductIDs);
  // console.log(`Successful product ids:`);
  // console.log(successfulProductIds);
  console.log(`Skipped listings:`);
  console.log(skippedListings);

  try {
    await fs.writeFile(
      "failedlistings.json",
      JSON.stringify(failedProductIDs, null, 2)
    );
    console.log("File has been saved.");
  } catch (error) {
    console.error("Error writing file:", error);
  }

  try {
    await fs.writeFile(
      "successfulListings.json",
      JSON.stringify(successfulProductIds, null, 2)
    );
    console.log("File has been saved.");
  } catch (error) {
    console.error("Error writing file:", error);
  }

  // Remove test: The below return is only used during testing
  //return createdProductTemplatesForReturning;
  //res.send(`<pre>${JSON.stringify(responseAllProducts.data, null, 2)}</pre>`);
}

module.exports = executeMainLogic;
