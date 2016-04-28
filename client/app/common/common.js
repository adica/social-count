import angular from 'angular';
import Navbar from './navbar/navbar';
import Headline from './headline/headline';

let commonModule = angular.module('app.common', [
  Navbar.name,
  Headline.name
]);

export default commonModule;
