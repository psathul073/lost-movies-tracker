// Add Dark Light Theme.
const darkTheme = localStorage.getItem("dark");
const lightTheme = localStorage.getItem("light");

// Dark Light Mode On Window Load.
if (lightTheme === "true") {
  document.body.classList.remove("dark");
}
if (darkTheme === "true") {
  document.body.classList.add("dark");
}

let switchSeries = document.getElementById("series");
let switchMovie = document.getElementById("movies");
const title = document.getElementById("headTitle");
const moviesBtn = document.getElementById("moviesBtn");
const seriesBtn = document.getElementById("seriesBtn");
let typeInput = document.getElementById("type");
const gif = document.getElementById("no-data-gif-3");

// Add Movies Container Switch.
function movies() {
  title.innerText = "Movies";
  typeInput.value = "movie";
  switchMovie.style.display = "block";
  switchSeries.style.display = "none";
  gif.style.display = "none";
  moviesBtn.style.outline = "2px solid var(--black-color-1)";
}

// Add Series Container Switch.
function series() {
  title.innerText = "Web Series";
  typeInput.value = "series";
  switchSeries.style.display = "block";
  switchMovie.style.display = "none";
  gif.style.display = "none";
  seriesBtn.style.outline = "2px solid var(--black-color-1)";
}

// /Show Search Inputs.
function showHide() {
  const SearchContainer = document.getElementById("getDataForm");
  const addIcon = document.getElementById("addIcon");
  const title = document.getElementById("tl");
  const year = document.getElementById("yr");

  if (SearchContainer.style.display === "block") {
    SearchContainer.style.display = "none";
    // addIcon.style.transform = "rotate(45deg)"
  } else {
    SearchContainer.style.display = "block";
    // addIcon.style.transform = "rotate(0deg)"
    // Clear Input Values.
    title.value = "";
    year.value = "";
  }
}

// Hide Message.
let msgBox = document.querySelector(".msg");
function msgExit() {
  msgBox.style.display = "none";
  window.location.href = "/add";
}
