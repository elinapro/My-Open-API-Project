//if you name the section banner, move it forward or back with z-index

//add the class

// const imageList = imagesSection.querySelector("ul");
// console.log("imagesList: ", imagesList);
//  Saved URL with API Key:
// "https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_Zb0masTqwCatZiNQPfY7dP7sz4KFao4TEOOIKXaNQDVpieJN1O0DeszDKCYen87L"
function get_random() {
  fetch("https://api.thedogapi.com/v1/images/search?limit=8") //9 images
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json(); // Parse the response as JSON
    })
    .then(function (data) {
      let imgTagz = data.map(create_image);
      imgTagz.forEach(display_images);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

//Create an image tag
function create_image(imageData) {
  let imgTag = document.createElement("img");
  imgTag.classList.add("dog-image");
  imgTag.setAttribute("src", imageData.url);
  //   imgTag.setAttribute("width", "300");
  imgTag.setAttribute("id", imageData.id);
  return imgTag;
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
const banner = document.querySelector("#info-panel");

function display_panel() {
  if (banner.classList.contains("invisible")) {
    banner.classList.remove("invisible");
    banner.classList.add("visible");
  } else {
    banner.classList.remove("visible");
    banner.classList.add("invisible");
  }
  // banner.classList.add("visible");
  // banner.classList.remove("visible");
}

//Create a click event handler to send you to the dog data

fetch("https://api.thedogapi.com/v1/images/search?size=small").then(
  (response) => {
    return response.json();
  }
);

// async function myAPIFunction() {
//   let apiKey = "123456";
//   let input = "Han Solo";

//   let response = await axios.get(
//     `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input}&days=7&aqi=no&alerts=no`
//   );
// }

// /*----------------------------- Event Listeners -----------------------------*/

let buttonElement = document.getElementById("button1");
buttonElement.addEventListener("click", display_panel);

//Add to the DOM, load images on page load
document.addEventListener("DOMContentLoaded", get_random);
document.addEventListener("DOMContentLoaded", display_panel);
