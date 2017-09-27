//不显示引入，你会得到"Uncaught reflect-metadata shim is required when using class decorators"的错误
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';
//angular2核心
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
//自定义模块
import { httpService }   from '../sevices/http.service';
import { AppComponent }   from './first/first.component';
import { SecondComponent }   from './second/second.component';

// 定义常量 路由
const appRoutes:Routes = [
    { path: '', component: AppComponent },
    { path: 'first', component: AppComponent },
    { path: 'second', component: SecondComponent },
    { path: '**', redirectTo: "first" }
];

@NgModule({
  imports:      [ BrowserModule, RouterModule.forRoot(appRoutes) ], //导入其他module，其它module暴露的出的Components、Directives、Pipes等可以在本module的组件中被使用。比如导入CommonModule后就可以使用NgIf、NgFor等指令。
  //exports:      [], //用来控制将哪些内部成员暴露给外部使用。导入一个module并不意味着会自动导入这个module内部导入的module所暴露出的公共成员。除非导入的这个module把它内部导入的module写到exports中。
  providers:    [ httpService ], //指定应用程序的根级别需要使用的service。（Angular2中没有模块级别的service，所有在NgModule中声明的Provider都是注册在根级别的Dependency Injector中）
  declarations: [ AppComponent, SecondComponent ], //模块内部Components的列表，声明一下这个模块内部成员
  bootstrap:    [ AppComponent ], //通常是app启动的根组件，一般只有一个component。bootstrap中的组件会自动被放入到entryComponents中。
  //entryCompoenents: [] //不会再模板中被引用到的组件。这个属性一般情况下只有ng自己使用，一般是bootstrap组件或者路由组件，ng会自动把bootstrap、路由组件放入其中。 除非不通过路由动态将component加入到dom中，否则不会用到这个属性。每个Angular2的应用都至少有一个模块即跟模块。
})

export class AppModule { }
