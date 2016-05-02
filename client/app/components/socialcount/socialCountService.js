import socialCountServiceResult from "./socialCountServiceResult";

class socialCountService {
    constructor($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
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
