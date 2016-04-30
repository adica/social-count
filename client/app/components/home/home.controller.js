class HomeController {
  constructor(socialCountService) {
  	'ngInject';
    this.name = 'home';
    this.socialCountService = socialCountService;
  }

  get socialCountResult(){
  	return this.socialCountService.getFacebookData;
  }
}

export default HomeController;
