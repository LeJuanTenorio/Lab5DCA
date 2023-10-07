import { dispatch } from '../../store/index';
import { addCharacter, removeCharacter } from '../../store/actions';
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
        const characterStatus = squadState[Object.keys(squadState)[index]].status;
        if (characterStatus === 'inactive') {
          console.log('Add');
          console.log(index);
          dispatch(addCharacter(index));
          console.log(squadState);
        } else {
          console.log('remove');
          dispatch(removeCharacter(index));
          console.log(squadState);
        }
      });
    });
  }

  render() {
    if (this.shadowRoot) {

      const inactive = document.createElement('div');
      inactive.className = 'reserve';

      const activeSquad = document.createElement('div');
      activeSquad.className = 'activeSquad';

      const inactiveCharacters:any = [];
      const activeCharacters:any = [];

      const characterData = Object.entries(squadState);
      characterData.forEach(([characterName, characterStatus]) => {
        if (characterStatus.status === 'inactive') {
          inactiveCharacters.push(
            `<img src="${characterStatus.portrait}" class="${characterStatus}">`
          );
        } else {
          activeCharacters.push(
            `<img src="${characterStatus.imageLarge}" class="${characterStatus}">`
          );
        }
      });

      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(activeSquad);
      this.shadowRoot.appendChild(inactive);

      inactive.innerHTML = inactiveCharacters.join('');
      activeSquad.innerHTML = activeCharacters.join('');
    }
  }
}

customElements.define('display-element', Display);
export default Display;
