export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clearHtml() {
    this._container.innerHTML = '';
  }

  addItem(element, isAppend = true) {
    isAppend
      ? this._container.append(element)
      : this._container.prepend(element);
  }
  renderItems(items, id) {
    items.forEach((item) => this._renderer(item, id));
  }
}
