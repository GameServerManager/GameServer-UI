import { createLogicalNot } from "typescript";
import genericApi from "./genericApi";

export default {
    all(): Promise<IServer[]>{
        return genericApi.get("/Server")
    },

    get(id: string): Promise<IServer> {
        return genericApi.get("/Server/" + id)
    },

    getLogs(id: string): Promise<string> {
        return genericApi.get("/Server/" + id + "/Log")
    },

    update(id : string, data : IServer) {
        return genericApi.put("/Server/" + id, data)
    },

    create(data : IServer) {
        return genericApi.post("/Server/", data)
    },

    delete(id : string) {
        return genericApi.delete("/Server/" + id)
    }
}