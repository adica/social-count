class HomeController {
  constructor(socialCountService) {
    this.name = 'home';
    this.socialCountService = socialCountService;
  }

  get socialCountResult(){
  	return this.socialCountService.getSocialCount;
  }
}

HomeController.$inject = [ 'socialCountService' ];
export default HomeController;
