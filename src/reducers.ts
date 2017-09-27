import { ActionReducer, Action } from '@ngrx/store';

export const ADD = 'ADD';

export function counter(state: number = 0, action: Action) {
	switch (action.type) {
		case ADD:
			return state + 1;

		default:
			return state;
	}
}
