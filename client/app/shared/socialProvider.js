const networks = require('./networks.json').networks;

class socialProvider {
	constructor(type){
		this.type = type;
		this.API = networks.filter((item) => {
            return item.type === this.type;
        })[0].api;
	}
}

export default socialProvider;
