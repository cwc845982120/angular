import { Component } from '@angular/core';
import axios from '../../common/http'
import './first.component.scss'

@Component({
  	selector: 'my-app',
	template: `
		<div class="first">
			<h1>angular</h1>
			<div (click)="getResponse()">ajax</div>
		</div>
	`
})

export class AppComponent { 
	getResponse() {
		axios.post('test',{}).then(function(res) {
			console.log(res);
		})
		.catch(e =>  {
			console.log(e);
		})
	}
}
