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

// /Link Copy.
function copyText() {
  const copyText = document.getElementById("link");
  const copyTextValue = copyText.innerText;
  // Create New Text Area.
  const textarea = document.createElement("textarea");
  const copiedArea = copyText.innerText;
  textarea.value = copiedArea;
  document.body.appendChild(textarea);
  // Select The Text Field.
  textarea.select();
  // For Mobile Device.
  textarea.setSelectionRange(0, 99999);
  // Copy the text inside the text field.
  navigator.clipboard.writeText(textarea.value);
  copyText.innerText = "Copied !";
  // Hide text Area.
  textarea.remove();
  // Add back old links.
  setTimeout(() => {
    copyText.innerText = copyTextValue;
  }, 600);
}
// Set poster size.
function viewPoster() {
  const poster = document.querySelector(".poster img");
  if (poster.style.objectFit === "scale-down") {
    poster.style.objectFit = "cover";
    poster.style.animation = "posterOut 450ms linear";
  } else {
    poster.style.objectFit = "scale-down";
    poster.style.animation = "posterIn 450ms linear";
  }
}
