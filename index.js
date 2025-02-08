//if you name the section banner, move it forward or back with z-index
const banner = document.querySelector("#info-panel");

// if using button
const closeModal = document.getElementById("closeModal");

//overlay
const bannerOverlay = document.getElementById("banner-overlay");

// const imageList = imagesSection.querySelector("ul");
// console.log("imagesList: ", imagesList);
//  Saved URL with API Key:
// "https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_Zb0masTqwCatZiNQPfY7dP7sz4KFao4TEOOIKXaNQDVpieJN1O0DeszDKCYen87L"
function get_dogs() {
  fetch("https://api.thedogapi.com/v1/images/search?limit=10") //10 random images
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json(); // Parse the response as JSON
    })
    .then(function (data) {
      let dogElements = data.slice(0, 9).map(create_dog);
      dogElements.forEach(display_images);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

//Create an image tag
function create_dog(imageData) {
  let button = document.createElement("button");
  let imgTag = document.createElement("img");
  imgTag.classList.add("dog-image");
  imgTag.setAttribute("src", imageData.url);
  //   imgTag.setAttribute("width", "300");
  imgTag.setAttribute("id", imageData.id);
  button.appendChild(imgTag);
  button.addEventListener("click", () => {
    show_banner();
    get_dog(imageData.id);
  });
  return button;
}

function get_dog(id) {
  fetch(`https://api.thedogapi.com/v1/images/${id}?include_breeds=true`) //10 random images
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json(); // Parse the response as JSON
    })
    .then(function (data) {
      const dog = create_dog_banner(data);
      document.getElementById("dog-details").appendChild(dog);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

//creates dog details in the modal
function create_dog_banner(imageData) {
  let dogBreed = document.createElement("h2");
  let imgTag = document.createElement("img");
  let div = document.createElement("div");
  let dogTemper = document.createElement("p");
  let lifeSpan = document.createElement("p");

  imgTag.classList.add("dog-image-modal");
  imgTag.setAttribute("src", imageData.url);
  //   imgTag.setAttribute("width", "300");
  imgTag.setAttribute("id", imageData.id);
  if (imageData.breeds !== undefined) {
    dogBreed.innerText = "This doggie is a " + imageData.breeds[0].name;
    dogTemper.innerText = imageData.breeds[0].temperament;
    lifeSpan.innerHTML =
      "<b>Typical life span: </b>" + imageData.breeds[0].life_span;
  } else {
    dogBreed.innerHTML =
      "This is an unknown doggie! <br>Breed data is not available.";
  }
  div.appendChild(dogBreed);
  div.appendChild(imgTag);
  div.appendChild(dogTemper);
  div.appendChild(lifeSpan);
  return div;
}

// //loop through the images array
// for (let i = 0; i < images.length; i++) {
//   const image = images[i].url;

//display the images
function display_images(imageTag) {
  let images = document.getElementById("image-container");
  images.appendChild(imageTag);
}

// banner modal for the 2nd fetch
function show_banner() {
  bannerOverlay.classList.remove("hidden");
  banner.classList.remove("hidden");
}
function hide_banner() {
  bannerOverlay.classList.add("hidden");
  banner.classList.add("hidden");
  document.getElementById("dog-details").innerHTML = "";
}

//   if (banner.classList.contains("invisible")) {
//     banner.classList.remove("invisible");
//     banner.classList.add("visible");
//   } else {
//     banner.classList.remove("visible");
//     banner.classList.add("invisible");
//   }
// banner.classList.add("visible");
// banner.classList.remove("visible");

//when the modal displays, we display and entire HTML element over the screen that grays everything out

//1.save the dogs id, 2. fetch that dog & display it in the modal when you click that button
//  3. add an X button that closes it
//make a div that covers the entire screen- make it display/ not display
//to dismiss the modal, have an X or clickout- add an onclick to the overlay
//when you click on the dog, keep track of which dog, add the ID to a JS variable
//depending on ID, create a new fetch with that ID
//that fetch will load the dogs info into the modal
//wrapping the dog elements in a button, button should display modal (button = click)
//as we load the dogs, wrap in achor tag
//each anchor tag would have a URL that goes to an ID for that dog

// async function myAPIFunction() {
//   let apiKey = "123456";
//   let input = "Han Solo";

//   let response = await axios.get(
//     `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input}&days=7&aqi=no&alerts=no`
//   );
// }

// /*----------------------------- Event Listeners -----------------------------*/

//Add to the DOM, load images on page load
document.addEventListener("DOMContentLoaded", get_dogs);
// document.addEventListener("DOMContentLoaded", display_panel);

// closing the modal
closeModal.addEventListener("click", function (event) {
  hide_banner();
  // banner.style.display = "none";
});

bannerOverlay.addEventListener("click", function (event) {
  hide_banner();
});
// // Close modal when close button is clicked
// closeModal.addEventListener("click", function () {
//   modal.style.display = "none";
// });
