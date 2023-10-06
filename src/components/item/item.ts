import { dispatch } from '../../store/index';
import { changeBackground } from '../../store/actions';

export enum Attribute {
	'description' = 'description',
	'text_button' = 'text_button',
}

export default class Display extends HTMLElement {
	description?: string;
	text_button?: string;

	static get observedAttributes() {
		const attrs: Record<Attribute, null> = {
			description: null,
			text_button: null,
		};
		return Object.keys(attrs);
	}

	attributeChangedCallback(propName: Attribute, _: unknown, newValue: string) {
		this[propName] = newValue;
		this.render();
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();

		const btn = this.shadowRoot?.querySelector('button');

		btn?.addEventListener('click', () => {
			console.log('holi');
			dispatch(
				changeBackground({
					backgroundColor: 'red',
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
        <h1>Hi this is my card</h1>
        <p>${this.description}</p>
        <button>${this.text_button}</button>
        `;
	}
}

customElements.define('display-element', Display);