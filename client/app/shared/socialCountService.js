import { FACEBOOK, PINTEREST } from './consts';

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
            return item.type === FACEBOOK
        })[0].api;
        this.pinterestAPI = networks.filter((item) => {
            return item.type === PINTEREST
        })[0].api;
    }


    getSocialCount(provider, pageUrl, urlArray = undefined, providers = undefined) {
        let deferred = this.$q.defer();
        let result;

        if (providers && urlArray) {
            deferred.resolve({ "providers": "urlArray" });
        } else if (urlArray) {
            deferred.resolve({ "urlArray": "yy" });
        } else if (provider.type === FACEBOOK) {
            this.$http.get(this.facebookAPI + `%27${pageUrl}%27`).then((response) => {
                result = new socialCountServiceResult(response.data.data[0]);
                deferred.resolve(result);
            });
        } else if (provider.type === PINTEREST) {
            this.$http.get(this.pinterestAPI + `${pageUrl}`).then((response) => {
                const clean = response.data.replace("cb(", "").replace(response.data[response.data.lastIndexOf(')')], "");
                result = new socialCountServiceResult(JSON.parse(clean));
                deferred.resolve(result);
            });
        }
        else{
        	deferred.resolve("no data");
        }
        return deferred.promise;
    }



}

export default socialCountService;
