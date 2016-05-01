class socialCountServiceResult {
    constructor(data) {
        if (data) {
            this.likes = data.like_count;
            this.shares = data.share_count;
            this.comments = data.comment_count;
            this.pins = data.count;
        }

    }
}


const networks = require('./networks.json').networks;

class socialCountService {
    constructor($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.socialCountObj = {};
        this.facebookAPI = networks.filter((item) => { 
        	return item.type === "facebook" 
        })[0].api;
        this.pinterestAPI = networks.filter((item) => { 
        	return item.type === "pinterest" 
        })[0].api;
    }

    getSocialCount(provider, pageUrl) {
        let deferred = this.$q.defer();
        let result;
        if (provider.type === "facebook") {
            this.$http.get(this.facebookAPI + `%27${pageUrl}%27`).then((response) => {
                result = new socialCountServiceResult(response.data.data[0]);
                deferred.resolve(result);
            });
        } else if (provider.type === "pinterest") {
            this.$http.get(this.pinterestAPI + `${pageUrl}`).then((response) => {
                const clean = response.data.replace("cb(", "").replace(response.data[response.data.lastIndexOf(')')], "");
                result = new socialCountServiceResult(JSON.parse(clean));
                deferred.resolve(result);
            });

        }
        return deferred.promise;
    }

}

export default socialCountService;
