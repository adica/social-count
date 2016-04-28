import template from './headline.html';
import controller from './headline.controller';
import './headline.styl';

let headlineComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default headlineComponent;
