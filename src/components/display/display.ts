import { dispatch } from '../../store/index';
import {addCharacter } from '../../store/actions';
import { squadState } from '../../store/index';

class Display extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();

    const images = this.shadowRoot?.querySelectorAll('img');

    images?.forEach((img, index) => {
      img?.addEventListener('click', () => {
        if (index < images.length) {
          const characterStatus = squadState[Object.keys(squadState)[index]].status;
          if (characterStatus === 'inactive') {
            console.log('Add');
            dispatch(addCharacter(index));
            console.log(squadState)
          }
        }
      });
    });
  }

  render() {
    if (this.shadowRoot) {
      const characterEntries = Object.entries(squadState);
      this.shadowRoot.innerHTML = characterEntries
        .map(([characterName, characterStatus]) => {
          if (characterStatus.status === 'inactive') {
            return `
              <img src="${characterStatus.portrait}" alt="${characterName}">
            `;
          } else {
            return `
            <img src="${characterStatus.imageLarge}" alt="${characterName}">
          `;
            return '';
          }
        })
        .join('');
    }
  }
}

customElements.define('display-element', Display);
export default Display;