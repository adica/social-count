import angular from 'angular';
import Home from './home/home';
import Socail from './socialcount/socialcount';

let componentModule = angular.module('app.components', [
  Home.name,
  Socail.name
]);

export default componentModule;
