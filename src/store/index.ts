import { SquadState, Observer } from '../types/store';
import { reducer } from './reducer';


export let squadState: SquadState = {
    Highlander: 'inactive',
    Crusader: 'inactive',
    Hunter: 'inactive',
};

console.log(squadState);
let observers: Observer[] = [];

export const dispatch = (action: any) => {
    const clone = JSON.parse(JSON.stringify(squadState));
    squadState = reducer(action, clone);
    observers.forEach((o) => o.render());
};

export const addObserver = (ref: Observer) => {
    observers = [...observers, ref];
};