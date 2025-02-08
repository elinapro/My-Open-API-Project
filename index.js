//if you name the section banner, move it forward or back with z-index
const banner = document.querySelector("#info-panel");
console.log(banner);

// const bannerOverlay = document.getElementById("banner-overlay");

//add the class

// const imageList = imagesSection.querySelector("ul");
// console.log("imagesList: ", imagesList);
//  Saved URL with API Key:
// "https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_Zb0masTqwCatZiNQPfY7dP7sz4KFao4TEOOIKXaNQDVpieJN1O0DeszDKCYen87L"
function get_dogs() {
  fetch("https://api.thedogapi.com/v1/images/search?limit=8") //10 random images
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json(); // Parse the response as JSON
    })
    .then(function (data) {
      let dogElements = data.map(create_dog);
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
    //save dog id in variable
    //fetch the dog by id
    //select the elements inside the modal, place dog data inside

    show_banner();
  });
  return button;
}

// //loop through the images array
// for (let i = 0; i < images.length; i++) {
//   const image = images[i].url;

//display the images
function display_images(imageTag) {
  let images = document.getElementById("image-container");
  images.appendChild(imageTag);
}

//building the banner panel for the 2nd fetch

function show_banner() {
  banner.classList.remove("hidden");
}

function hide_banner() {
  banner.classList.add("hidden");
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

// closing the modal outside the modal
window.addEventListener("click", function (event) {
  if (event.target === banner) {
    banner.style.display = "none";
  }
});
