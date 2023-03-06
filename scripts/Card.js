
export class Card {
    constructor(data, selectorTemplate) {
        const {name, link, alt = name} = data

        this._name = name
        this._link = link
        this._alt = alt

        this._selectorTemplate = selectorTemplate
    }
    _toggleButtonClassActive(evt) {
        evt.target.classList.toggle('like-button_active');
    }

    _removeCard(element) {
        element.remove()
}
    // _setEventListener(selector, callback){
    //     const likeButton = elementLi.querySelector('.place__like-button');
    //     likeButton.addEventListener('click', this._toggleButtonClassActive);
    // }

    // _setEventListener() {
    //     const removeButton = elementLi.querySelector('.place__remove-button');
    //     removeButton.addEventListener('click', () => elementLi.remove());
    // }

    _setEventListener(selector, callback,element = document){
        element.querySelector(selector).addEventListener('click', callback);
    }



     createPlaceCard() {
        const elementLi = this._selectorTemplate.querySelector('.place__item').cloneNode(true);

        const img = elementLi.querySelector('.place__img');
        img.src = this._link;
        img.alt = this._alt;
        elementLi.querySelector('.place__name').textContent = this._name;

         // this._setEventListener('.place__remove-button',this._removeCard,elementLi )
         this._setEventListener('.place__like-button', this._toggleButtonClassActive,elementLi)



        const openPopupButton = elementLi.querySelector('.place__open-popup-button');
        openPopupButton.addEventListener('click', () => {
            fillPopupCard(card.name, card.link, img.alt);
            openPopup(popupCard);
        });

        return elementLi;
    }
}

// function fillPopupCard(name, src, alt) {
//     popupName.textContent = popupName;
//     popupImg.src = src;
//     popupImg.alt = alt;
// }
//
// function toggleButtonClassActive(evt) {
//     evt.target.classList.toggle('like-button_active');
// }

// function createPlaceCard(card, template) {
//     const elementLi = template.querySelector('.place__item').cloneNode(true);
//
//     const img = elementLi.querySelector('.place__img');
//     img.src = card.link;
//     img.alt = card.name;
//     elementLi.querySelector('.place__name').textContent = card.name;
//
//     const likeButton = elementLi.querySelector('.place__like-button');
//     likeButton.addEventListener('click', toggleButtonClassActive);
//
//     const removeButton = elementLi.querySelector('.place__remove-button');
//     removeButton.addEventListener('click', () => elementLi.remove());
//
//     const openPopupButton = elementLi.querySelector('.place__open-popup-button');
//     openPopupButton.addEventListener('click', () => {
//         fillPopupCard(card.name, card.link, img.alt);
//         openPopup(popupCard);
//     });
//
//     return elementLi;
// }
//
// const placeCardsPrepared = initialPlaceCards.map((card) =>
//     createPlaceCard(card, templatePlaceItem)
// );
// cardsContainer.append(...placeCardsPrepared);
