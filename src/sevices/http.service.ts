import { Injectable } from '@angular/core';
import axios from '../common/http'

@Injectable()

export class httpService {
    getResponse(url, params) {
        return new Promise(function(resolve, reject) {
            axios.post(url, params).then(function(res) {
               console.log('----返回参数----' + JSON.stringify(res));
               resolve(res);
           })
           .catch(e => {
               console.log('----请求错误----' + JSON.stringify(e));
               resolve(e);
           })
       })
    }
}
