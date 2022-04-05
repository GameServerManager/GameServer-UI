import Axios, { AxiosResponse } from 'axios';
let ENDPOINT = 'https://localhost:7123/api';
let token = "";
export default {
	ENDPOINT() {
		return ENDPOINT;
	},
	TOKEN() {
		return token;
	},
	SetTOKEN(_token: string) {
		token = _token;
	},
	get<RetType>(path: string): Promise<RetType> {
		var promis = new Promise<RetType>((resolve, reject) => Axios.get(ENDPOINT + path, {
			headers: {
				'Authorization': `${this.TOKEN()}` 
			}
		})
		.then((value) => {
			if (value.data != "") {
				resolve(value.data)
			} else {
				reject()
			}
		})
		.catch(err => reject(err)))
        return promis;
	},
	post<DataType, RetType>(path: string, data : DataType): Promise<RetType> {
		var promis = new Promise<RetType>((resolve, reject) => Axios.post(ENDPOINT + path, data, {
			headers: {
				'Authorization': `${this.TOKEN()}` 
			}
		})
		.then((value) => {
			if (value.data != "") {
				resolve(value.data)
			} else {
				reject()
			}
		})
		.catch(err => reject(err)))
        return promis;
    },
	put<DataType, RetType>(path: string, data: DataType): Promise<RetType>{
		var promis = new Promise<RetType>((resolve, reject) => Axios.put(ENDPOINT + path, data, {
			headers: {
				'Authorization': `${this.TOKEN()}` 
			}
		})
		.then((value) => {
			if (value.data != "") {
				resolve(value.data)
			} else {
				reject()
			}
		})
		.catch(err => reject(err)))
        return promis;
	},
	delete<RetType>(path : string) : Promise<RetType> {
		var promis = new Promise<RetType>((resolve, reject) => Axios.delete(ENDPOINT + path, {
			headers: {
				'Authorization': `${this.TOKEN()}` 
			}
		})
		.then((value) => {
			if (value.data != "") {
				resolve(value.data)
			} else {
				reject()
			}
		})
		.catch(err => reject(err)))
		return promis;
	},
	Authenticate(loginInfo) : Promise<string>{
		return new Promise((resolve, reject) => Axios.post(ENDPOINT + "/User/login/", loginInfo).then((value) => {
			if (value.data != "") {
				this.SetTOKEN(value.data);

				resolve(value.data)
			} else {
				reject()
			}
		})
		.catch(err => reject(err)))
	},
	
	Register(registerInfo): Promise<void>{
		return new Promise((resolve, reject) => Axios.post(ENDPOINT + "/User/register/", registerInfo).then((value) => {
			if (value.data) {
				resolve()
			} else {
				reject()
			}
		})
		.catch(err => reject(err)))
	}
};
