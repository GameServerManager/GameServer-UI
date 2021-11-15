import genericApi from "./genericApi";

export default {
    all(){
        return genericApi.get("Servers")
    },

    get(id) {
        //return genericApi.get("Servers/" + id)
        return {
            name: "Mock " + id,
            comment: "Mock Comment for " + id,
            discription: "Mock Discription for testing " + id,
            status: "Test Status Running " + id,
            state: "Test State Running " + id,
        }
    },

    update(id, data) {
        return genericApi.put("Servers/" + id, data)
    },

    create(data) {
        return genericApi.post("Servers/" + id, data)
    },

    delete(id) {
        return genericApi.delete("Servers/" + id)
    }
}