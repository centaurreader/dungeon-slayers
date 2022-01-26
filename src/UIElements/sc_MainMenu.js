import UIScene from '../Engine/UIScene';

class MainMenuScene extends UIScene {
  static styles = `
    .main_menu {
      position: absolute;
      width: 80%;
      height: 80%;
      left: 50%;
      transform: translate(-50%, 120%);
      background: white;
      padding: 1rem;
      top: 10%;
      transition: transform .125s;
      z-index: 2;
    }
    .main_menu--open {
      transform: translate(-50%, 0);
    }
  `;

  constructor(element, elements) {
    super('main_menu', element, elements);
    this.element.setAttribute('style', 'display: none;');
    this.init();
  }

  init() {
    const style = document.querySelector(`style[name="${this.name}"`);
    if (!style) {
      const styleElement = document.createElement('style');
      styleElement.setAttribute('name', this.name);
      styleElement.innerHTML = MainMenuScene.styles;
      document.head.appendChild(styleElement);
    }

    const mainMenu = document.getElementById('main_menu-instance');
    if (!mainMenu) {
      const newMenu = this.element.content.cloneNode(true).querySelector('div');
      this.instance = newMenu;
      document.body.appendChild(newMenu);
    } else {
      this.instance = mainMenu;
    }

    this.instance.classList.add('main_menu');
    this.instance.removeAttribute('style');
    setTimeout(() => {
      this.instance.classList.add('main_menu--open');
    }, 250);
  }
}

export default MainMenuScene;
