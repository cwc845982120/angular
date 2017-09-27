import { Component } from '@angular/core';
import { httpService }   from '../../sevices/http.service';
import './first.component.scss'

@Component({
	selector: 'my-app',
	template: `
		<div class="first">
			<h1>first</h1>
			<div (click)="getResponse()">ajax</div>
			<my-second></my-second>
			<!-- 路由内容显示区域 -->
			<router-outlet></router-outlet>
		</div>
	`
})

export class AppComponent { 
	constructor(
		private httpService : httpService
	){ }

	getResponse(): void {
		this.httpService.getResponse('test', {});
	}
}
