const sendMessageLink = document.querySelector(".quick-chat");
const sendMessagePopup = document.querySelector(".quick-chat-modal");

if (sendMessageLink && sendMessagePopup) {
  const sendMessageForm = sendMessagePopup.querySelector("form");
  const sendMessageClose = sendMessagePopup.querySelector(".modal-close");

  sendMessageLink.addEventListener("click", function (evt) {
    evt.preventDefault();
      overlay.classList.remove("visually-hidden");
      sendMessagePopup.classList.remove("visually-hidden");
      sendMessagePopup.classList.add("modal-animation");
        if (storage) {
        username.value = storage;
        useremail.focus();
    } else {
        username.focus();
    }
  });

  sendMessageClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    overlay.classList.add("visually-hidden");
    sendMessagePopup.classList.add("visually-hidden");
    sendMessagePopup.classList.remove("modal-animation");
  });
}