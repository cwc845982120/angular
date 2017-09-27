import { Component } from '@angular/core';
import axios from 'axios'

@Component({
  	selector: 'my-app',
	templateUrl: './src/app/first/first.tpl.html'
})

export class AppComponent { 
	message = "Angular 应用";
	getResponse() {
		axios.post('test',{}).then(function(res) {
			console.log(res);
		})
		.catch(e =>  {
			console.log(e);
		})
	}
}
