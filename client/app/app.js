import angular from 'angular';
import uiRouter from 'angular-ui-router';
import Components from './components/components';
import Shared from './shared/shared';
import AppComponent from './app.component';
import 'normalize.css';

angular.module('app', [
    uiRouter,
    Components.name,
    Shared.name
  ])
  .config(($locationProvider) => {
    "ngInject";
    // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
    // #how-to-configure-your-server-to-work-with-html5mode
    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .component('app', AppComponent);
