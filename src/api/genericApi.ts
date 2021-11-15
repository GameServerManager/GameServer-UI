import Axios from 'axios';

let ENDPOINT = 'localhost:4444/';

export default {
	ENDPOINT() {
		return ENDPOINT;
	},
	get(path : string): any {
		return Axios.get(ENDPOINT + path);
	},
	post(path : string, data : any): any {
		return Axios.post(ENDPOINT + path, data);
    },
    put(path : string, data: any) {
		return Axios.put(ENDPOINT + path, data);
	},
	delete(path : string) {
		return Axios.delete(ENDPOINT + path);
	}
};
