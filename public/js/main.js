// Open Nav Bar $Fun.
function openNav() {
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("openNav").style.display = "none";
  document.getElementById("addBtn").style.display = "none";

  if (window.innerWidth >= "767") {
    document.getElementById("main").style.marginLeft = "250px";
    document.querySelector(".head").style.paddingLeft = "260px";
    // document.getElementById("profile-2").style.display = "none";
  }

  if (window.innerWidth <= "767") {
    document.getElementById("main").style.marginLeft = "0px";
    document.querySelector(".head").style.paddingLeft = "0px";
    document.querySelector(".overlay").style.display = "block";
    // document.getElementById("profile-2").style.display = "block";
  }
}
//  Close Nav Bar $Fun.
function closeNav() {
  document.getElementById("main").style.marginLeft = "0%";
  document.querySelector(".head").style.paddingLeft = "12px";
  document.getElementById("sidebar").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  // Hide Headers Add Button.
  if (window.innerWidth >= "767") {
    document.getElementById("addBtn").style.display = "block";
  }
}

// Each Items view function.
function viewItems(items) {
  window.location.href = `/view/${items.id}`;
}

// Navbar Dropdown Menu.
const sbDropdownBtn = document.getElementById("profile-2");
const sidebarMenu = document.getElementById("sideMenu");
sbDropdownBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevents click from propagating to the document.
  sidebarMenu.classList.toggle("smActive");
  footer.classList.remove("active");
});

// Main Dropdown Menu.
const dropdownBtn = document.getElementById("profile-1");
const mainMenu = document.getElementById("mainMenu");
const mainMenuItem = document.querySelectorAll(".menu .items");
dropdownBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  mainMenu.classList.toggle("mmActive");
  popupMenu.classList.remove("activePopup");
  profilePopup.classList.remove("activePopup");
  footer.classList.remove("active");
  bgBlur.style.display = "none";
});

// Show Settings PopUp.
const settingsBtn = document.querySelectorAll(".settings");
const popupMenu = document.querySelector(".settingPopUp");
const bgBlur = document.getElementById("bgBlur");
for (let i = 0; i < settingsBtn.length; i++) {
  settingsBtn[i].addEventListener("click", (e) => {
    e.stopPropagation();
    popupMenu.classList.toggle("activePopup");
    bgBlur.style.display = "block";
  });
}

// Show Profile Popup.
const profileBtn = document.querySelectorAll(".profileBtn");
const profilePopup = document.querySelector(".profilePopUp");
for (let i = 0; i < profileBtn.length; i++) {
  profileBtn[i].addEventListener("click", (e) => {
    e.stopPropagation();
    profilePopup.classList.toggle("activePopup");
    bgBlur.style.display = "block";
  });
}

// Close Navbar,Main Dropdowns When Click An Option.
for (let i = 0; i < mainMenuItem.length; i++) {
  mainMenuItem[i].addEventListener("click", (e) => {
    e.stopPropagation();
    mainMenu.classList.remove("mmActive");
    sidebarMenu.classList.remove("smActive");
    // bgBlur.style.display ="none";
  });
}

// Close Navbar,Main Dropdowns And PopUp Menu When Click Outside.
document.addEventListener("click", (e) => {
  mainMenu.classList.remove("mmActive");
  sidebarMenu.classList.remove("smActive");
  popupMenu.classList.remove("activePopup");
  profilePopup.classList.remove("activePopup");
  footer.classList.remove("active");
  bgBlur.style.display = "none";
});

// Dark And Light Mod.
const dark = document.getElementById("dark");
const light = document.getElementById("light");
const darkTheme = localStorage.getItem("dark");
const lightTheme = localStorage.getItem("light");

// Dark Light Mode On Window Load.
if (lightTheme === "true") {
  document.body.classList.remove("dark");
  light.checked = true;
  dark.checked = false;
}
if (darkTheme === "true") {
  document.body.classList.add("dark");
  light.checked = false;
  dark.checked = true;
}

// Dark Mode Checkbox.
dark.addEventListener("click", (e) => {
  e.stopPropagation();
  // Stop Remove Setting Popup Menu And Blur.
  popupMenu.classList.add("activePopup");
  bgBlur.style.display = "block";
  // Add Dark Background.
  if (dark.checked) {
    document.body.classList.add("dark");
    light.checked = false;
    dark.checked = true;
    // Add Localstorage.
    localStorage.setItem("light", light.checked);
    localStorage.setItem("dark", dark.checked);
  } else {
    document.body.classList.remove("dark");
    light.checked = true;
    dark.checked = false;
    // Add Localstorage.
    localStorage.setItem("light", light.checked);
    localStorage.setItem("dark", dark.checked);
  }
});
// Light Mode Checkbox.
light.addEventListener("click", (e) => {
  e.stopPropagation();
  // Stop Remove Setting Popup Menu And Blur.
  popupMenu.classList.add("activePopup");
  bgBlur.style.display = "block";

  // Add Dark Background.
  if (light.checked) {
    document.body.classList.remove("dark");
    dark.checked = false;
    light.checked = true;
    // Add Localstorage.
    localStorage.setItem("light", light.checked);
    localStorage.setItem("dark", dark.checked);
  } else {
    document.body.classList.add("dark");
    dark.checked = true;
    light.checked = false;
    // Add Localstorage.
    localStorage.setItem("light", light.checked);
    localStorage.setItem("dark", dark.checked);
  }
});

// Footer Show.
const footerBtn = document.getElementById("footerBtn");
const footer = document.querySelector("footer");
footerBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  footer.classList.toggle("active");
});
// Footer Date.
document.getElementById("date").innerText = new Date().getFullYear(); 

