const overlay = document.querySelector(".modal-overlay");
const mapLink = document.querySelector(".contacts img");
const mapPopup = document.querySelector(".modal-map");

if (mapLink && mapPopup) {
  const mapClose = mapPopup.querySelector(".modal-close");

  mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.remove("visually-hidden");
    mapPopup.classList.remove("visually-hidden");
    mapPopup.classList.add("modal-animation");
  });

  mapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.add("visually-hidden");
    mapPopup.classList.add("visually-hidden");
    mapPopup.classList.remove("modal-animation");
  });

  overlay.addEventListener("click", function () {
    overlay.classList.add("visually-hidden");
    mapPopup.classList.add("visually-hidden");
    mapPopup.classList.remove("modal-animation");
  });
}
