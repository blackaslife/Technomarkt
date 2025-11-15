const itemsLink = document.querySelector('.btn-buy');
const itemsPopup = document.querySelector('.modal-add-items');

if (itemsLink && itemsPopup) {
    const itemsClose = itemsPopup.querySelector('.modal-close');

    itemsLink.addEventListener('click', function (evt) {
        evt.preventDefault();
        overlay.classList.remove('visually-hidden');
        itemsPopup.classList.remove('visually-hidden');
        itemsPopup.classList.add('modal-animation');
    });

    itemsClose.addEventListener('click', function (evt) {
        evt.preventDefault();
        overlay.classList.add('visually-hidden');
        itemsPopup.classList.add('visually-hidden');
        itemsPopup.classList.remove('modal-animation');
    });

}