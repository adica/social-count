import angular from 'angular';
import Home from './home/home';
import HeadLine from './headLine/headLine';
import Socail from './socialcount/socialcount';

let componentModule = angular.module('app.components', [
  Home.name,
  Socail.name,
  HeadLine.name
]);

export default componentModule;
