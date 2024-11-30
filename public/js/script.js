// Password Show Hide.
function showHide() {
  const pwd = document.getElementById("password");
  const icon = document.getElementById("sh-icon");
  if (pwd.type === "password") {
    pwd.type = "text";
    // Set Eye Icon.
    icon.setAttribute("name", "eye-off-outline");
  } else {
    pwd.type = "password";
    icon.setAttribute("name", "eye-outline");
  }
}
