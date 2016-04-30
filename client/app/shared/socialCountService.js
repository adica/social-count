import socialProvider from './socialProvider';

class socialCountService {
	constructor(){
		this.socialCountObj = {};
	}
	
	

	_getSocialCount(provider, pageUrl){
		let result = {};
		if (provider.type === "facebook"){
			//find likes of pageURL from FB API
			result = {"likes" : "1000"}
		}
		//add pintertest
		return result;
	}

	get getSocialCount(){
		const provider = new socialProvider("facebook");
		this.socialCountObj = this._getSocialCount(provider, "http://www.ynet.co.il");
		return this.socialCountObj;
	}

}

export default socialCountService;