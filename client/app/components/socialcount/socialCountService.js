import { FACEBOOK, PINTEREST } from './../../shared/consts';
const networks = require('./../../shared/data.json').networks;

class socialCountServiceResult {
    constructor(data) {
        if (data && !data.error) {
            if (typeof data === "object") {
                this.network = FACEBOOK;
                data = data.data[0];
            } else if (data.indexOf("cb(") !== -1) {
                this.network = PINTEREST;
                const clean = data.replace("cb(", "").replace(data[data.lastIndexOf(')')], "");
                data = JSON.parse(clean);
            }

            this.url = data.url;
            this.likes = data.like_count;
            this.shares = data.share_count;
            this.comments = data.comment_count;
            this.pins = data.count;
        }
    }
}



class socialCountService {
    constructor($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.socialCountObj = {};
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
            resArr = [],
            result,
            all;

        if (providers && urlArray) {
        //multiple providers / multiple urls            
            providers.forEach((prov) => {
                urlArray.forEach((url) => {
                    deferredArr.push(this.getData(prov.API.replace("##pageUrl##", url)));
                });
            });
            all = this.$q.all(deferredArr);
            all.then((data) => {
                data.forEach((item) => {
                    resArr.push(new socialCountServiceResult(item.data));
                });
                deferred.resolve(resArr);
            });

        } else if (urlArray) {
        	//one provider / multiple urls
            urlArray.forEach((url) => {
                deferredArr.push(this.getData(provider.API.replace("##pageUrl##", url)));
            });
            all = this.$q.all(deferredArr);
            all.then((data) => {
                data.forEach((item) => {
                    resArr.push(new socialCountServiceResult(item.data));
                });
                deferred.resolve(resArr);
            });

        } else {
        	//one provider / one url
            this.getData(provider.API.replace("##pageUrl##", pageUrl)).then((response) => {
                result = new socialCountServiceResult(response.data);
                deferred.resolve(result);
            });
        }
        return deferred.promise;
    }

}

export default socialCountService;
