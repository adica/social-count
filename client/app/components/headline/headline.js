import angular from 'angular';
import uiRouter from 'angular-ui-router';
import headlineComponent from './headline.component';

let headlineModule = angular.module('headline', [
  uiRouter
])

.component('headline', headlineComponent);

export default headlineModule;
