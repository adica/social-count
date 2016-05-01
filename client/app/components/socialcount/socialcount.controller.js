import {FACEBOOK, PINTEREST} from './../../shared/consts';
import socialProvider from './../../shared/socialProvider';

class SocialcountController {
    constructor(socialCountService) {
    	'ngInject';
        this.name = 'socialcount';
        this.url = "http://www.google.com"; //defualt value
        this.selectedNetwork = FACEBOOK; //defualt value
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

    onGetDataUrls(){
    	const provider = new socialProvider(this.selectedNetwork);
    	const urls = ["http://www.google.com", "http://www.yahoo.com"];
        this.socialCountService.getSocialCount(provider, this.url, urls).then((data) => {
            this.socialCountResult = data;
        });	
    }

    onGetDataProviersUrls(){    	
    	const provider = new socialProvider(this.selectedNetwork);
    	const providers = [new socialProvider(FACEBOOK),new socialProvider(PINTEREST)];
    	const urls = ["http://www.google.com", "http://www.yahoo.com"];
        this.socialCountService.getSocialCount(provider, this.urls, urls, providers).then((data) => {
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
