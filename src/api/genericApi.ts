import Axios, { AxiosResponse } from 'axios';
let ENDPOINT = 'https://localhost:7123/api';

export default {
	ENDPOINT() {
		return ENDPOINT;
	},
	get<RetType>(path: string): Promise<RetType> {
		var promis = new Promise<RetType>((resolve, reject) => Axios.get(ENDPOINT + path).then((value)=>{resolve(value.data)}))
        return promis;
	},
	post<RetType>(path: string, data: RetType): Promise<RetType> {
		var promis = new Promise<RetType>((resolve, reject) => Axios.post(ENDPOINT + path, data).then((value)=>{resolve(value.data)}))
        return promis;
    },
	put<RetType>(path: string, data: RetType): Promise<RetType>{
		var promis = new Promise<RetType>((resolve, reject) => Axios.put(ENDPOINT + path, data).then((value)=>{resolve(value.data)}))
        return promis;
	},
	delete<RetType>(path : string) : Promise<RetType> {
		var promis = new Promise<RetType>((resolve, reject) => Axios.delete(ENDPOINT + path).then((value)=>{resolve(value.data)}))
		return promis;
	}
};
