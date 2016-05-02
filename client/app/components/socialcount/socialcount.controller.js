import {FACEBOOK, PINTEREST} from './../../shared/consts';
import socialProvider from './socialProvider';
const urlList =  require('./../../shared/data.json').urls; 
const networks = require('./../../shared/data.json').networks;

class SocialcountController {
    constructor(socialCountService) {
    	'ngInject';
        this.name = 'socialcount';
        this.url = urlList[0]; //defualt value
        this.selectedNetwork = FACEBOOK; //defualt value
        this.socialNetworksList = networks;        
        this.socialCountService = socialCountService;
        this.socialCountResult = undefined;
    }

    onGetData() {
        const provider = new socialProvider(this.selectedNetwork);
        this.socialCountService.getSocialCount(provider, this.url).then((data) => {
            this.socialCountResult = data;
        });
    }

    onGetDataUrls(){
    	const provider = new socialProvider(this.selectedNetwork);
        this.socialCountService.getSocialCount(provider, this.url, urlList).then((data) => {
            this.socialCountResult = data;
        });	
    }

    onGetDataProviersUrls(){    	
    	const provider = new socialProvider(this.selectedNetwork);
    	const providers = [new socialProvider(FACEBOOK),new socialProvider(PINTEREST)];
        this.socialCountService.getSocialCount(provider, this.url, urlList, providers).then((data) => {
            this.socialCountResult = data;
        });	
    }

   
}

export default SocialcountController;
