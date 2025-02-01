const Images = document.getElementById("images");
console.log("imagesSection: ", imagesSection);

const imagesList = imagesSection.querySelector("ul");
console.log("imagesList: ", imagesList);
//  Saved URL with API Key:
// "https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_Zb0masTqwCatZiNQPfY7dP7sz4KFao4TEOOIKXaNQDVpieJN1O0DeszDKCYen87L"

fetch("https://api.thedogapi.com/v1/images/search?limit=9")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Request failed");
    }
    return response.json(); // Parse the response as JSON
  })
  .then((data) => {
    console.log(data); // Do something with the data
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

//loop through the images array
for (let i = 0; i < images.length; i++) {
  const image = images[i].url;

  //creating the DOM element
  const li = document.createElement("li");
  // put the data from the project into the DOM element (li)
  li.innerText = oneImage;
  //Any list items
  imagesList.appendChild(li);
}

// async function myAPIFunction() {
//   let apiKey = "123456";
//   let input = "Han Solo";

//   let response = await axios.get(
//     `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input}&days=7&aqi=no&alerts=no`
//   );
// }

// /*----------------------------- Event Listeners -----------------------------*/

// buttonElement.addEventListener("click", myFunction);
// document.addEventListener("DOMContentLoaded", myFunction);
