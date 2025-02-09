//references to page elements
const banner = document.querySelector("#info-panel");
const bannerOverlay = document.getElementById("banner-overlay");

//  API Key:
// live_Zb0masTqwCatZiNQPfY7dP7sz4KFao4TEOOIKXaNQDVpieJN1O0DeszDKCYen87L

//1st fetch to call 9 random dog images from the Dog API
//note: the limit in this url isn't respected by the API

function get_dogs() {
  fetch("https://api.thedogapi.com/v1/images/search?limit=9") //9 random images
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json(); // Parse the response as JSON
    })
    .then(function (data) {
      let dogElements = data.slice(0, 9).map(create_dog); //using first 9 images
      dogElements.forEach(display_images);
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
}

//Creates an image tag for each dog
function create_dog(imageData) {
  let button = document.createElement("button");
  let imgTag = document.createElement("img");
  imgTag.classList.add("dog-image");
  imgTag.setAttribute("src", imageData.url);
  imgTag.setAttribute("id", imageData.id);
  button.appendChild(imgTag);
  button.addEventListener("click", () => {
    show_banner();
    get_dog(imageData.id);
  });
  return button;
}

//2nd fetch to request dog data about a selected image
function get_dog(id) {
  fetch(`https://api.thedogapi.com/v1/images/${id}?include_breeds=true`)
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

//displays the 9 images grid for the 1st fetch
function display_images(imageTag) {
  let images = document.getElementById("image-container");
  images.appendChild(imageTag);
}

// shows the modal for the 2nd fetch
function show_banner() {
  bannerOverlay.classList.remove("hidden");
  banner.classList.remove("hidden");
}

//hides the modal
function hide_banner() {
  bannerOverlay.classList.add("hidden");
  banner.classList.add("hidden");
  document.getElementById("dog-details").innerHTML = "";
}

// /*----------------------------- Event Listeners -----------------------------*/

//Add to the DOM, load images on page load
document.addEventListener("DOMContentLoaded", get_dogs);

// closing the modal using the X
const closeModal = document.getElementById("closeModal");
closeModal.addEventListener("click", function (event) {
  hide_banner();
});

//closing the modal by clicking outside of it on the overlay
bannerOverlay.addEventListener("click", function (event) {
  hide_banner();
});
