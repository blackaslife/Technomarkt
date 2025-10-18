let isStorageSupport = true;
let storage = "";

try {
    storage = localStorage.getItem("username");
} catch (err) {
    isStorageSupport = false;
}

// Закриття всіх модальних вікон натисканням ESC
// querySelectorAll(".modal-animation") вибирає всі відкриті модальні вікна

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();

    const modals = document.querySelectorAll(".modal-animation");
    modals.forEach(modal => {
      modal.classList.add("visually-hidden");
      modal.classList.remove("modal-animation");
      modal.classList.remove("modal-error");
    });
  }
});

