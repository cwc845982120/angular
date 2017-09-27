import { Component } from '@angular/core';
import { httpService }   from '../../sevices/http.service';
import { Store } from '@ngrx/store';
import { ADD } from '../../reducers';
import './first.component.scss'
import { Observable } from 'rxjs/Observable';

interface AppState {
	reducer: number;
  }

@Component({
	selector: 'my-app',
	template: `
		<div class="first">
			<h1>first</h1>
			<div (click)="getResponse()">ajax</div>
			<div (click)="reducerAdd()">reducer: {{ reducer | async }}</div>
			<my-second></my-second>
			<!-- 路由内容显示区域 -->
			<router-outlet></router-outlet>
		</div>
	`
})

export class AppComponent { 
	reducer: Observable<number>;

	constructor(
		private httpService : httpService,
		private store: Store<AppState>
	){ 
		this.reducer = store.select('reducer');
	}

	getResponse(): void {
		this.httpService.getResponse('test', {});
	}

	reducerAdd(): void {
		this.store.dispatch({ type: ADD });
	}
}
