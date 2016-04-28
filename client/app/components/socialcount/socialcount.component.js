import template from './socialcount.html';
import controller from './socialcount.controller';
import './socialcount.styl';

let socialcountComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller,
  controllerAs: 'vm'
};

export default socialcountComponent;
