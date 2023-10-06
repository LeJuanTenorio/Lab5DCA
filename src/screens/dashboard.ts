import { addObserver, squadState, dispatch } from '../store/index';
import "../components/export"

export class Dashboard extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) this.shadowRoot.innerHTML = '';
		const display = this.ownerDocument.createElement('display-element');
		this.shadowRoot?.appendChild(display);
	}
}

customElements.define('app-dashboard', Dashboard);
