const registrationLink = document.querySelector(".enter-navigation-registration");
const registrationPopup = document.querySelector(".modal-registration");

if (registrationLink && registrationPopup) {
  const registrationForm = registrationPopup.querySelector("form");
  const registrationClose = registrationPopup.querySelector(".modal-close");
  const registrationUsername = registrationPopup.querySelector("[name=First_Name]");
  const registrationLastname = registrationPopup.querySelector("[name=Last_Name]");
  const registrationEmail = registrationPopup.querySelector("[name=Email]");
  const registrationPassword = registrationPopup.querySelector("[name=Password]");

  registrationLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    registrationPopup.classList.remove("visually-hidden");
    registrationPopup.classList.add("modal-animation");
    registrationUsername.focus();
  });

  registrationForm.addEventListener("submit", function (evt) {
    if (
      !registrationUsername.value ||
      !registrationLastname.value ||
      !registrationEmail.value ||
      !registrationPassword.value
    ) {
      evt.preventDefault();
      registrationPopup.classList.remove("modal-error");
      registrationPopup.offsetWidth = registrationPopup.offsetWidth;
      registrationPopup.classList.add("modal-error");
    }
  });

  registrationClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    registrationPopup.classList.add("visually-hidden");
    registrationPopup.classList.remove("modal-animation");
    registrationPopup.classList.remove("modal-error");
  });
}