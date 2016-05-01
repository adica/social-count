import socialProvider from './../../shared/socialProvider';

class HomeController {
    constructor(socialCountService) {
        'ngInject';
        this.name = 'home';
        this.url = "http://www.google.com";
        this.socialNetworksList = [{type : "facebook"},{type: "pinterest"}];
        this.selectedNetwork = "facebook"; //defualt value
        this.socialCountService = socialCountService;
        this.socialCountResult = {};
    }

    onGetData() {
    	const provider = new socialProvider(this.selectedNetwork);
        this.socialCountService.getSocialCount(provider, this.url).then((data) => {
            this.socialCountResult = data;
        });
    }

    get socialCount() {
        return this.socialCountResult;
    }

    set socialCount(val) {
        this.socialCountResult = val;
    }
}

export default HomeController;
