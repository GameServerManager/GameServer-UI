import Axios from 'axios';

let ENDPOINT = 'localhost:4444/';

export default {
	ENDPOINT() {
		return ENDPOINT;
	},
	get(path) {
		return Axios.get(ENDPOINT + path);
	},
	post(path, data) {
		return Axios.post(ENDPOINT + path, data);
    },
    put(path, data) {
		return Axios.put(ENDPOINT + path, data);
	},
	delete(path, options) {
		return Axios.delete(ENDPOINT + path, options);
	}
};
