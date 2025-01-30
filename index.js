fetch(
  "https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=beng&api_key=live_Zb0masTqwCatZiNQPfY7dP7sz4KFao4TEOOIKXaNQDVpieJN1O0DeszDKCYen87L"
)
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
