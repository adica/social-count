import { FACEBOOK, PINTEREST } from './consts';

class socialCountServiceResult {
    constructor(data) {
        if (data) {
        	this.url = data.url;
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

    getData(url) {
        let deferred = this.$q.defer();
        this.$http.get(url).then((response) => {
            deferred.resolve(response);
        });
        return deferred.promise;
    }

    getSocialCount(provider, pageUrl, urlArray = undefined, providers = undefined) {
        let deferred = this.$q.defer(),
            deferredArr = [],
            result;

        if (providers && urlArray) {
            deferred.resolve({ "providers": "urlArray" });
        } else if (urlArray) {

            urlArray.forEach((url) => {
                if (provider.type === FACEBOOK) {
                    deferredArr.push(this.getData(this.facebookAPI + `%27${url}%27`));
                } else if (provider.type === PINTEREST) {
                    deferredArr.push(this.getData(this.pinterestAPI + `${url}`));
                }
            });
            let all = this.$q.all(deferredArr),
                resArr = [];
            all.then((data) => {
                data.forEach((item) => {

                    if (provider.type === FACEBOOK) {
                        resArr.push(new socialCountServiceResult(item.data.data[0]));
                    } else if (provider.type === PINTEREST) {
                        const clean = item.data.replace("cb(", "").replace(item.data[item.data.lastIndexOf(')')], "");
                        resArr.push(new socialCountServiceResult(JSON.parse(clean)));
                    }

                });
                deferred.resolve(resArr);
            });

        } else if (provider.type === FACEBOOK) {
            this.getData(this.facebookAPI + `%27${pageUrl}%27`).then((response) => {
                result = new socialCountServiceResult(response.data.data[0]);
                deferred.resolve(result);
            });
        } else if (provider.type === PINTEREST) {
            this.getData(this.pinterestAPI + `${pageUrl}`).then((response) => {
                const clean = response.data.replace("cb(", "").replace(response.data[response.data.lastIndexOf(')')], "");
                result = new socialCountServiceResult(JSON.parse(clean));
                deferred.resolve(result);
            });
        } else {
            deferred.resolve("no data");
        }
        return deferred.promise;
    }



}

export default socialCountService;
