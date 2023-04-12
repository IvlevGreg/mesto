(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var n=function(){function t(e,n,r,o,i){var u=r.handleCardClick,a=r.handleRemovePopup,s=o.putLike,l=o.deleteLike;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var c=e.name,p=e.link,f=e.alt,h=void 0===f?c:f,y=e.likes,b=e._id,m=e.owner._id;this._name=c,this._link=p,this._alt=h,this._likes=y,this._cardId=b,this._authorId=m,this._handleCardClick=u,this._handleRemovePopup=a,this._putLike=s,this._deleteLike=l,this._template=document.getElementById(n).content,this._liElement=this._template.querySelector(".place__item").cloneNode(!0),this._imgElement=this._liElement.querySelector(".place__img"),this._openPopupButtonElement=this._liElement.querySelector(".place__open-popup-button"),this._likeButtonElement=this._liElement.querySelector(".place__like-button"),this._likeAmountElement=this._liElement.querySelector(".place__like-amount"),this._removeButtonElement=this._liElement.querySelector(".place__remove-button"),this._userId=i}var n,r;return n=t,(r=[{key:"_toggleButtonClassActive",value:function(t){this._likeButtonElement.classList.toggle("like-button_active",t)}},{key:"removeCard",value:function(){this._liElement.remove(),this._liElementent=null}},{key:"_setLikesAmount",value:function(t){this._likeAmountElement.textContent=t}},{key:"_setLikes",value:function(t){this._setLikesAmount(t.length),this._likes=t}},{key:"_addLike",value:function(){var t=this;this._setLikesAmount("..."),this._putLike(this._cardId).then((function(e){var n=e.likes;t._setLikes(n),t._toggleButtonClassActive(!0)})).catch((function(){return t._setLikesAmount("Упс...")}))}},{key:"_removeLike",value:function(){var t=this;this._setLikesAmount("..."),this._deleteLike(this._cardId).then((function(e){var n=e.likes;t._setLikes(n),t._toggleButtonClassActive(!1)})).catch((function(){return t._setLikesAmount("Упс...")}))}},{key:"_isUserLike",value:function(){var t=this;return this._likes.findIndex((function(e){var n=e._id;return t._userId===n}))>-1}},{key:"_isUserAuthor",value:function(){return this._authorId===this._userId}},{key:"_setEventListener",value:function(){var t=this;this._likeButtonElement.addEventListener("click",(function(){t._isUserLike()?t._removeLike():t._addLike()})),this._isUserAuthor()&&this._removeButtonElement.addEventListener("click",(function(){return t._handleRemovePopup(t)})),this._openPopupButtonElement.addEventListener("click",(function(){t._handleCardClick(t._name,t._link,t._alt)}))}},{key:"createPlaceCard",value:function(){return this._imgElement.src=this._link,this._imgElement.alt=this._alt,this._liElement.querySelector(".place__name").textContent=this._name,this._setLikesAmount(this._likes.length),this._toggleButtonClassActive(this._isUserLike()),this._isUserAuthor()||this._removeButtonElement.remove(),this._setEventListener(),this._liElement}}])&&e(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),t}();function r(t){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r(t)}function o(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,e){if("object"!==r(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===r(i)?i:String(i)),o)}var i}var i=function(){function t(e,n){var r=e.inputSelector,o=e.submitButtonSelector,i=e.inactiveButtonClass,u=e.inputErrorClass,a=e.errorClass;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._inputSelector=r,this._submitButtonSelector=o,this._inactiveButtonClass=i,this._inputErrorClass=u,this._errorClass=a,this._form=document.querySelector(n),this._inputList=Array.from(this._form.querySelectorAll(this._inputSelector)),this._buttonSubmit=this._form.querySelector(this._submitButtonSelector)}var e,n;return e=t,(n=[{key:"_toggleInputError",value:function(t,e){t.validity.valid?this._hideInputError(t):this._showInputError(t,e)}},{key:"_showInputError",value:function(t,e){var n=t.closest("label").querySelector("span");t.classList.add(this._inputErrorClass),n.classList.add(this._errorClass),n.textContent=e}},{key:"_hideInputError",value:function(t){var e=t.closest("label").querySelector("span");e.classList.remove(this._errorClass),t.classList.remove(this._inputErrorClass),e.textContent=""}},{key:"_toggleButtonState",value:function(){this._inputList.every((function(t){return t.validity.valid}))?this.enableButton():this.disableButton()}},{key:"checkFormValidity",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){t._toggleInputError(e,e.validationMessage)}))}},{key:"disableButton",value:function(){this._buttonSubmit.classList.add(this._inactiveButtonClass),this._buttonSubmit.disabled=!0}},{key:"enableButton",value:function(){this._buttonSubmit.classList.remove(this._inactiveButtonClass),this._buttonSubmit.disabled=!1}},{key:"_setEventListener",value:function(){var t=this;this._inputList.forEach((function(e){e.addEventListener("input",(function(){t._toggleInputError(e,e.validationMessage),t._toggleButtonState()}))}))}},{key:"enableValidation",value:function(){this._setEventListener()}}])&&o(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function u(t){return u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},u(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==u(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==u(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===u(o)?o:String(o)),r)}var o}var s=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._renderer=r,this._container=document.querySelector(n)}var e,n;return e=t,n=[{key:"clearHtml",value:function(){this._container.innerHTML=""}},{key:"addItem",value:function(t){arguments.length>1&&void 0!==arguments[1]&&!arguments[1]?this._container.prepend(t):this._container.append(t)}},{key:"renderItems",value:function(t,e){var n=this;t.forEach((function(t){return n._renderer(t,e)}))}}],n&&a(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function l(t){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l(t)}function c(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==l(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==l(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===l(o)?o:String(o)),r)}var o}var p=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._buttonClose=this._popup.querySelector(n),this._handleEscClose=this._handleEscClose.bind(this)}var e,n;return e=t,(n=[{key:"_handleEscClose",value:function(t){"Escape"==t.key&&this.close()}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.body.classList.remove("pages_popup-opened"),document.removeEventListener("keyup",this._handleEscClose)}},{key:"_handleOutsidePopup",value:function(t){t.target===this._popup&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("mousedown",(function(e){return t._handleOutsidePopup(e)})),this._buttonClose.addEventListener("click",(function(){return t.close()}))}},{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.body.classList.add("pages_popup-opened"),document.addEventListener("keyup",this._handleEscClose)}}])&&c(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==f(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==f(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===f(o)?o:String(o)),r)}var o}function y(){return y="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=m(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},y.apply(this,arguments)}function b(t,e){return b=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},b(t,e)}function m(t){return m=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},m(t)}var v=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&b(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=m(r);if(o){var n=m(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===f(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e,n){var r;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(r=i.call(this,t,e))._submitCallback=n,r._inputs=r._popup.querySelectorAll("input")||[],r._form=r._popup.querySelector("form"),r._btnSubmitElement=r._popup.querySelector('button[type="submit"]'),r._btnSubmitText=r._btnSubmitElement.textContent,r}return e=u,(n=[{key:"_getFocusOnFirstInput",value:function(){this._popup.querySelector("input")&&this._popup.querySelector("input").focus()}},{key:"open",value:function(){y(m(u.prototype),"open",this).call(this),this._getFocusOnFirstInput()}},{key:"setEventListeners",value:function(){var t=this;y(m(u.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(e){e.preventDefault(),t.setStatus("loading"),t._submitCallback().then((function(){t.close(),t.setStatus("success")})).catch((function(e){t.setStatus("error")}))}))}},{key:"getInputValues",value:function(){var t={};return this._inputs.forEach((function(e){t[e.name]=e.value})),t}},{key:"_changeBtnSubmitText",value:function(t){this._btnSubmitElement.textContent=t}},{key:"setStatus",value:function(t){switch(t){case"loading":this._changeBtnSubmitText("Сохранение...");break;case"success":this._changeBtnSubmitText(this._btnSubmitText);break;case"error":this._changeBtnSubmitText("Попробуйте еще раз")}}},{key:"setInputValues",value:function(t){return this._inputs.forEach((function(e){t[e.name]&&(e.value=t[e.name].trim())})),t}},{key:"close",value:function(){y(m(u.prototype),"close",this).call(this),this._form.reset()}}])&&h(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function _(t){return _="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_(t)}function d(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==_(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==_(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===_(o)?o:String(o)),r)}var o}function g(){return g="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=E(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},g.apply(this,arguments)}function S(t,e){return S=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},S(t,e)}function E(t){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},E(t)}var k=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&S(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=E(r);if(o){var n=E(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===_(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t,e))._popupName=n._popup.querySelector(".popup__name"),n._popupImg=n._popup.querySelector(".popup__img"),n}return e=u,n=[{key:"open",value:function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t;g(E(u.prototype),"open",this).call(this),this._popupName.textContent=t,this._popupImg.src=e,this._popupImg.alt=n}}],n&&d(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function w(t){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(t)}function O(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==w(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==w(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===w(o)?o:String(o)),r)}var o}var P=function(){function t(e,n,r){var o=r.handleImgCallback,i=r.handleProfileEditCallback,u=r.handleAddButtonCallback;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t);var a=e.name,s=e.about,l=e.avatar;this._name=a,this._about=s,this._avatar=l,this._template=document.getElementById(n).content,this._sectionElement=this._template.querySelector(".profile").cloneNode(!0),this._imgButtonElement=this._sectionElement.querySelector(".profile__img-btn"),this._editButtonElement=this._sectionElement.querySelector(".profile__edit-button"),this._addButtonElement=this._sectionElement.querySelector(".profile__add-button"),this._imgElement=this._sectionElement.querySelector(".profile__img"),this._nameElement=this._sectionElement.querySelector(".profile__title"),this._aboutElement=this._sectionElement.querySelector(".profile__descr"),this._handleImgCallback=o,this.handleProfileEditCallback=i,this.handleAddButtonCallback=u}var e,n;return e=t,(n=[{key:"_setEventListener",value:function(){this._imgButtonElement.addEventListener("click",this._handleImgCallback),this._editButtonElement.addEventListener("click",this.handleProfileEditCallback),this._addButtonElement.addEventListener("click",this.handleAddButtonCallback)}},{key:"getUserInfo",value:function(){return{name:this._nameElement.textContent,about:this._aboutElement.textContent}}},{key:"setUserInfo",value:function(t){var e=t.name,n=t.about;this._nameElement.textContent=e,this._aboutElement.textContent=n}},{key:"setUserImg",value:function(t){var e=t.avatar;this._imgElement.src=e}},{key:"createUser",value:function(){return this._imgElement.src=this._avatar,this._imgElement.alt="аватар пользователя: ".concat(this._name),this._nameElement.textContent=this._name,this._aboutElement.textContent=this._about,this._setEventListener(),this._sectionElement}}])&&O(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function j(t){return j="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},j(t)}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,L(r.key),r)}}function L(t){var e=function(t,e){if("object"!==j(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==j(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===j(e)?e:String(e)}var B=function(){function t(e){var n=e.baseUrl,r=e.headers.authorization;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._baseUrl=n,this._authorization=r,this.putLike=this.putLike.bind(this),this.deleteLike=this.deleteLike.bind(this),this.removeCard=this.removeCard.bind(this)}var e,n;return e=t,(n=[{key:"_parseJson",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getInitialCards",value:function(){return fetch("".concat(this._baseUrl,"/cards"),{headers:{authorization:this._authorization}}).then(this._parseJson)}},{key:"postNewCard",value:function(t){var e,n,r,o=t.name,i=t.link;return fetch("".concat(this._baseUrl,"/cards"),{method:"POST",headers:(e={authorization:this._authorization},n="Content-Type",r="application/json",(n=L(n))in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e),body:JSON.stringify({name:o,link:i})}).then(this._parseJson)}},{key:"removeCard",value:function(t){return fetch("".concat(this._baseUrl,"/cards/").concat(t),{method:"DELETE",headers:{authorization:this._authorization}}).then(this._parseJson)}},{key:"putLike",value:function(t){return fetch("".concat(this._baseUrl,"/cards/").concat(t,"/likes"),{method:"PUT",headers:{authorization:this._authorization}}).then(this._parseJson)}},{key:"deleteLike",value:function(t){return fetch("".concat(this._baseUrl,"/cards/").concat(t,"/likes"),{method:"DELETE",headers:{authorization:"7a43c762-4e63-438c-856b-e056a5084ee3"}}).then(this._parseJson)}},{key:"getUserdata",value:function(){return fetch("".concat(this._baseUrl,"/users/me"),{headers:{authorization:this._authorization}}).then(this._parseJson)}},{key:"updateUserData",value:function(t){var e=t.name,n=t.about;return fetch("".concat(this._baseUrl,"/users/me"),{method:"PATCH",headers:{authorization:this._authorization,"Content-Type":"application/json"},body:JSON.stringify({name:e,about:n})}).then(this._parseJson)}},{key:"updateUserImg",value:function(t){var e=t.avatar;return fetch("".concat(this._baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{authorization:this._authorization,"Content-Type":"application/json"},body:JSON.stringify({avatar:e})}).then(this._parseJson)}}])&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function I(t){return I="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},I(t)}function T(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==I(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==I(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===I(o)?o:String(o)),r)}var o}function q(){return q="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=U(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},q.apply(this,arguments)}function x(t,e){return x=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},x(t,e)}function U(t){return U=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},U(t)}var R=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&x(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=U(r);if(o){var n=U(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===I(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t,e))._inputs=n._popup.querySelectorAll("input")||[],n._form=n._popup.querySelector("form"),n._btnSubmitElement=n._popup.querySelector('button[type="submit"]'),n._btnSubmitText=n._btnSubmitElement.textContent,n}return e=u,(n=[{key:"setSubmitAction",value:function(t){this._handleSubmitEvent=t}},{key:"setEventListeners",value:function(){var t=this;q(U(u.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(e){e.preventDefault(),t.setStatus("loading"),t._handleSubmitEvent().then((function(){t.close(),t.setStatus("success")})).catch((function(e){t.setStatus("error")}))}))}},{key:"_changeBtnSubmitText",value:function(t){this._btnSubmitElement.textContent=t}},{key:"setStatus",value:function(t){switch(t){case"loading":this._changeBtnSubmitText("Сохранение...");break;case"success":this._changeBtnSubmitText(this._btnSubmitText);break;case"error":this._changeBtnSubmitText("Попробуйте еще раз")}}}])&&T(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(p);function A(t){return A="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},A(t)}function z(){return z=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(t[r]=n[r])}return t},z.apply(this,arguments)}function D(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function J(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?D(Object(n),!0).forEach((function(e){V(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):D(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function V(t,e,n){return(e=function(t){var e=function(t,e){if("object"!==A(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==A(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===A(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}document.querySelector(".profile__add-button");var N="template-place-item",F=document.querySelector(".main"),H={inputSelector:".popup-form__input",submitButtonSelector:".popup-form__submit-button",inactiveButtonClass:"popup-form__submit-button_disabled",inputErrorClass:"popup-form__input_error_active",errorClass:"popup-form__input-error_active"},M=new B({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-63",headers:{authorization:"7a43c762-4e63-438c-856b-e056a5084ee3","Content-Type":"application/json"}}),G=new k(".popup_card",".popup__close-button");G.setEventListeners();var K=new R(".popup_card-remove",".popup__close-button");function Q(t,e){return new n(t,N,{handleCardClick:G.open.bind(G),handleRemovePopup:W},M,e).createPlaceCard()}function W(t){K.open.call(K),K.setSubmitAction((function(){return M.removeCard(t._cardId).then((function(){t.removeCard(),K.close(),K.setStatus("success")})).catch((function(t){throw K.setStatus("error"),new Error(t)}))}))}K.setEventListeners();var X=new s({renderer:function(t,e){X.addItem(Q(t,e))}},".place__list");new i(H,".popup-form_edit").enableValidation(),M.getUserdata().then((function(t){var e=new v(".popup_profile-img-edit",".popup__close-button",(function(){return M.updateUserImg(J({},e.getInputValues())).then((function(t){r.setUserImg(t)})).catch((function(t){throw new Error(t)}))}));e.setEventListeners();var n=new i(H,".popup_profile-img-edit");n.enableValidation();var r=new P(t,"template-profile",{handleImgCallback:function(){n.disableButton(),e.open()},handleProfileEditCallback:function(){o.setInputValues(J({},r.getUserInfo())),o.open()},handleAddButtonCallback:function(){Y.disableButton(),u.open()}});F.prepend(r.createUser());var o=new v(".popup_edit",".popup__close-button",(function(){return M.updateUserData(J({},o.getInputValues())).then((function(t){r.setUserInfo(t)})).catch((function(t){throw new Error(t)}))}));o.setEventListeners(),M.getInitialCards().then((function(e){X.renderItems(e,t._id)})).catch((function(t){console.log(t)}));var u=new v(".popup_create",".popup__close-button",(function(){Y.disableButton();var e=u.getInputValues(),n=z({},(function(t){if(null==t)throw new TypeError("Cannot destructure "+t)}(e),e));return M.postNewCard(n).then((function(e){X.addItem(Q(e,t._id),!1)})).catch((function(t){throw new Error(t)})).finally((function(){Y.enableButton()}))}));u.setEventListeners()})).catch((function(t){console.log(t)}));var Y=new i(H,".popup-form_create");Y.enableValidation()})();