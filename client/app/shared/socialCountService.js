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


class socialCountService {
    constructor($http, $q) {
        'ngInject';
        this.$http = $http;
        this.$q = $q;
        this.socialCountObj = {};
        this.facebookAPI = "https://graph.facebook.com/fql?q=SELECT%20url,%20share_count,%20like_count%20,%20comment_count%20FROM%20link_stat%20WHERE%20url=";
        this.pinterestAPI = "http://api.pinterest.com/v1/urls/count.json?callback=cb&url=";
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
