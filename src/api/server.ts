import genericApi from "./genericApi";

export default {
    all(): IServer[]{
        let a: IServer = {
            name: "",
            comment: "",
            discription: "",
            status: "",
            state: ""
        };
        return [a];
        //return genericApi.get("Servers")
    },

    get(id: string): IServer {
        let a: IServer = {
            name: "",
            comment: "",
            discription: "",
            status: "",
            state: ""
        };
        return a;
        //return genericApi.get("Servers/" + id)
    },

    update(id : string, data : IServer) {
        return genericApi.put("Servers/" + id, data)
    },

    create(data : IServer) {
        return genericApi.post("Servers/", data)
    },

    delete(id : string) {
        return genericApi.delete("Servers/" + id)
    }
}