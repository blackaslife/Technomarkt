const link = document.querySelector(".contacts button");
const popup = document.querySelector(".modal-contact");
const form = popup.querySelector("form");
const close = document.querySelector(".modal-contact .modal-close");
const username = popup.querySelector("[name=name]");
const useremail = popup.querySelector("[name=email]");
const mapLink = document.querySelector(".contacts img");
const mapPopup = document.querySelector(".modal-map");
const mapClose = mapPopup.querySelector(".modal-close");

const loginLink = document.querySelector(".enter-navigation-login");
const loginPopup = document.querySelector(".modal-login");
const loginClose = loginPopup.querySelector(".modal-close");
const loginUsername = loginPopup.querySelector("[name=name]");
const loginUserpassword = loginPopup.querySelector("[name=password]");

let isStorageSupport = true;
let storage = "";

try {
    storage = localStorage.getItem("username");
} catch (err) {
    isStorageSupport = false;
}

// ==========================
// Contact modal
// ==========================

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
    if(!username.value || !useremail.value) {
    evt.preventDefault();
    popup.classList.remove("modal-error");
    popup.offsetWidth = popup.offsetWidth;
    popup.classList.add("modal-error");
    } else {
        if(isStorageSupport) {
        localStorage.setItem("username", username.value);                    
        }
    }
});

window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
            evt.preventDefault();
            popup.classList.add("visually-hidden");
            mapPopup.classList.add("visually-hidden");
            loginPopup.classList.add("visually-hidden");
            popup.classList.remove("modal-animation");
            popup.classList.remove("modal-error");
            mapPopup.classList.remove("modal-animation");
            loginPopup.classList.remove("modal-animation");
            loginPopup.classList.remove("modal-error");
    }
});

// ==========================
// Map modal
// ==========================

mapLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.remove("visually-hidden");
    mapPopup.classList.add("modal-animation");
});

mapClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    mapPopup.classList.add("visually-hidden");
    mapPopup.classList.remove("modal-animation");
});

// ==========================
// Login modal
// ==========================

loginLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    loginPopup.classList.remove("visually-hidden");
    loginPopup.classList.add("modal-animation");

    if (storage) {
        loginUsername.value = storage;
        loginUserpassword.focus();
    } else {
        loginUsername.focus();
    }

});

loginClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    loginPopup.classList.add("visually-hidden");
    loginPopup.classList.remove("modal-animation");
    loginPopup.classList.remove("modal-error");
});