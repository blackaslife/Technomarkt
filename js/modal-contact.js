const link = document.querySelector(".contacts button");
const popup = document.querySelector(".modal-contact");

if (link && popup) {
  const form = popup.querySelector("form");
  const close = popup.querySelector(".modal-close");
  const username = popup.querySelector("[name=name]");
  const useremail = popup.querySelector("[name=email]");

  link.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("visually-hidden");
    popup.classList.add("modal-animation");

    if (storage) {
      username.value = storage;
      useremail.focus();
    } else {
      username.focus();
    }
  });

  close.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.add("visually-hidden");
    popup.classList.remove("modal-animation");
    popup.classList.remove("modal-error");
  });

  form.addEventListener("submit", function (evt) {
    if (!username.value || !useremail.value) {
      evt.preventDefault();
      popup.classList.remove("modal-error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal-error");
    } else if (isStorageSupport) {
      localStorage.setItem("username", username.value);
    }
  });
}