const { fetchAllListings } = require("./helper_functions");

const fs = require("fs").promises;

async function getRequiredListings() {
  // Fetch all listings from Printify and store them in allProductsData array
  let allProductsData = [];
  let currentPage = 1;
  let lastPage = null;

  do {
    console.log(`Current page: ${currentPage}`);
    const response = await fetchAllListings(currentPage);
    console.log(`Current page contains ${response.data.length} listings`);
    allProductsData.push(...response.data);
    currentPage = response.current_page + 1;
    lastPage = response.last_page;
    console.log(
      `All products array length now ${allProductsData.length} listings`
    );
    console.log(`Last page: ${lastPage}`);
  } while (currentPage <= lastPage);

  console.log(allProductsData.length);

  let listingsForConversion = [];

  for (const item of allProductsData) {
    // If it matches the requirments
    if (
      item.blueprint_id === 6 &&
      (item.print_provider_id === 6 || item.print_provider_id === 26)
    ) {
      listingsForConversion.push(item);
    }
  }

  console.log(`listingsForConversion.length: ${listingsForConversion.length}`);

  // Write the listingsForConversion array to a JSON file
  try {
    await fs.writeFile(
      "listingsForConversion(new).json",
      JSON.stringify(listingsForConversion, null, 2)
    );
    console.log("File has been saved.");
  } catch (error) {
    console.error("Error writing file:", error);
  }

  return listingsForConversion;
}

module.exports = getRequiredListings;
