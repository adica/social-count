import socialProvider from './../../shared/socialProvider';

class SocialcountController {
    constructor(socialCountService) {
    	'ngInject';
        this.name = 'socialcount';
        this.url = "http://www.google.com"; //defualt value
        this.selectedNetwork = "facebook"; //defualt value
        this.socialNetworksList = require('./../../shared/networks.json').networks;        
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

export default SocialcountController;
