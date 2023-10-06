import { dispatch } from '../../store/index';
import { addCharacter } from '../../store/actions';
import { squadState } from '../../store/index'
import {squadMembers} from '../../data/data'

export default class Item extends HTMLElement {

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();

		const btn = this.shadowRoot?.querySelector('button');

		btn?.addEventListener('click', () => {
			console.log('add');
			dispatch(
				addCharacter({
					: 'active',
				})
			);
		});
	}

	mount() {
		this.render();
	}

	render() {
		if (this.shadowRoot)
			this.shadowRoot.innerHTML = `
        `;
	}
}

customElements.define('item-element', Item);