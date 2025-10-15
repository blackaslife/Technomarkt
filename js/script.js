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
const loginForm = loginPopup.querySelector("form");
const loginClose = loginPopup.querySelector(".modal-close");
const loginUsername = loginPopup.querySelector("[name=name]");
const loginUserpassword = loginPopup.querySelector("[name=password]");

const registrationLink = document.querySelector(".enter-navigation-registration");
const registrationPopup = document.querySelector(".modal-registration");
const registrationForm = registrationPopup.querySelector("form");
const registrationClose = registrationPopup.querySelector(".modal-close");
const registrationUsername = registrationPopup.querySelector("[name=First_Name]");
const registrationLastname = registrationPopup.querySelector("[name=Last_Name]");
const registrationEmail = registrationPopup.querySelector("[name=Email]");
const registrationPassword = registrationPopup.querySelector("[name=Password]");

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
            registrationPopup.classList.add("visually-hidden");
            popup.classList.remove("modal-animation");
            popup.classList.remove("modal-error");
            mapPopup.classList.remove("modal-animation");
            loginPopup.classList.remove("modal-animation");
            loginPopup.classList.remove("modal-error");
            registrationPopup.classList.remove("modal-animation");
            registrationPopup.classList.remove("modal-error");
            

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

loginForm.addEventListener("submit", function (evt) {
    if(!loginUsername.value || !loginUserpassword.value) {
        evt.preventDefault();
        loginPopup.classList.remove("modal-error");
        loginPopup.offsetWidth = loginPopup.offsetWidth;
        loginPopup.classList.add("modal-error");
    } else {
        if(isStorageSupport) {
            localStorage.setItem("username", loginUsername.value);
        }
    }

})

loginClose.addEventListener("click", function (evt) {
    evt.preventDefault();
    loginPopup.classList.add("visually-hidden");
    loginPopup.classList.remove("modal-animation");
    loginPopup.classList.remove("modal-error");
});

// ==========================
// Modal registration
// ==========================

registrationLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    registrationPopup.classList.remove("visually-hidden");
    registrationPopup.classList.add("modal-animation");
    registrationUsername.focus();
});

registrationForm.addEventListener("submit", function (evt) {
    if(!registrationUsername.value || !registrationLastname.value || !registrationEmail.value || !registrationPassword.value) {
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

// ==========================
// Modal Send Message on Contact Page
// ==========================

const sendMessageLink = document.querySelector(".quick-chat");
const sendMessagePopup = document.querySelector(".quick-chat-modal");
const sendMessageForm = sendMessagePopup.querySelector("form");
const sendMessageClose = sendMessagePopup.querySelector(".modal-close");

sendMessageLink.addEventListener("click", function (evt) {
    evt.preventDefault();
    sendMessagePopup.classList.remove("visually-hidden");
    sendMessagePopup.classList.add("modal-animation");
    
    if (storage) {
        username.value = storage;
        useremail.focus();
    } else {
        username.focus();
    }
});

// змінити структуру JS зробити під кожну сторінку окремий файл JS
// зробити перевірку наявності елементів на сторінці перед тим як вішати слухачі подій