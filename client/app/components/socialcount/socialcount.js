import angular from 'angular';
import uiRouter from 'angular-ui-router';
import socialcountComponent from './socialcount.component';
import socialCountService from './socialCountService';

let socialcountModule = angular.module('socialcount', [
  uiRouter
])

.component('socialcount', socialcountComponent)
.service({
    socialCountService
  });

export default socialcountModule;
