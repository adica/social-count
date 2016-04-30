import socialProvider from './socialProvider';

class socialCountService {
	constructor($http, $q){
		'ngInject';
		this.$http = $http;
		this.$q = $q;
		this.socialCountObj = {};
		this.facebookAPI = "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27http://www.google.com%27";
	}
	
	

	_getSocialCount(provider, pageUrl){
		let result = {};
		let deferred = this.$q.defer();
		if (provider.type === "facebook"){
			//find likes of pageURL from FB API
			/*this.$http.get(this.facebookAPI).then(function(response) {
        		deferred.resolve(respone.data);
    		});*/
		}
		//add pintertest
		 return deferred.promise;
	}

	get getFacebookData(){
		const provider = new socialProvider("facebook");
		this.socialCountObj = this._getSocialCount(provider, "http://www.ynet.co.il");
		return this.socialCountObj;
	}

}

export default socialCountService;