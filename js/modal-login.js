const loginLink = document.querySelector(".enter-navigation-login");
const loginPopup = document.querySelector(".modal-login");

if (loginLink && loginPopup) {
  const loginForm = loginPopup.querySelector("form");
  const loginClose = loginPopup.querySelector(".modal-close");
  const loginUsername = loginPopup.querySelector("[name=name]");
  const loginUserpassword = loginPopup.querySelector("[name=password]");

  loginLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.remove("visually-hidden");
    loginPopup.classList.remove("visually-hidden");
    loginPopup.classList.add("modal-animation");

    if (storage) {
      loginUsername.value = storage;
      loginUserpassword.focus();
    } else {
      loginUsername.focus();
    }
  });

  loginForm.addEventListener("submit", function (evt) {
    if (!loginUsername.value || !loginUserpassword.value) {
      evt.preventDefault();
      loginPopup.classList.remove("modal-error");
      loginPopup.offsetWidth = loginPopup.offsetWidth;
      loginPopup.classList.add("modal-error");
    } else if (isStorageSupport) {
      localStorage.setItem("username", loginUsername.value);
    }
  });

  loginClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.add("visually-hidden");
    loginPopup.classList.add("visually-hidden");
    loginPopup.classList.remove("modal-animation");
    loginPopup.classList.remove("modal-error");
  });
}