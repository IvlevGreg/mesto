export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clearHtml() {
    this._container.innerHTML = '';
  }

  addItem(element) {
    this._container.prepend(element);
  }
  renderItems() {
    this.clearHtml();

    this._items.forEach((item) => this._renderer(item));
  }
}
