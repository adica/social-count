import angular from 'angular';
import uiRouter from 'angular-ui-router';
import socialcountComponent from './socialcount.component';

let socialcountModule = angular.module('socialcount', [
  uiRouter
])

.component('socialcount', socialcountComponent);

export default socialcountModule;
