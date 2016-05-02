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


export default socialCountServiceResult;