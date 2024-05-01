const { fetchAllListings, deleteListingAPI } = require("./helper_functions");

const fs = require("fs").promises;

// Fetch all listings from Printify and store them in allProductsData array
//   let allProductsData = [];
//   let currentPage = 1;
//   let lastPage = null;

//   do {
//     console.log(`Current page: ${currentPage}`);
//     const response = await fetchAllListings(currentPage);
//     console.log(`Current page contains ${response.data.length} listings`);
//     allProductsData.push(...response.data);
//     currentPage = response.current_page + 1;
//     lastPage = response.last_page;
//     console.log(
//       `All products array length now ${allProductsData.length} listings`
//     );
//     console.log(`Last page: ${lastPage}`);
//   } while (currentPage <= 1); //lastPage);

//return allProductsData;

//console.log(`allProductsData.length: ${allProductsData.length}`);

async function deleteListings(idsForDeletion) {
  let failedDeletions = [];

  for (const item of idsForDeletion) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const deletionResponse = await deleteListingAPI(item);
      if (deletionResponse) {
        console.log(`Deleted listing: ${item}`);
      } else {
        console.error(`Error deleting listing: ${item}`);
        failedDeletions.push(item);
      }
    } catch (error) {
      console.error(`Error deleting listing: ${item}`);
      failedDeletions.push(item);
    }
  }

  console.log(`Remaining un-deleted Ids: ${failedDeletions}`);

  return failedDeletions;
}

module.exports = deleteListings;
