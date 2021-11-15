import genericApi from "./genericApi";

const Servers = new Map<string, IServer>([
    ["Teamspeak", {
        name: "Teamspeak",
        comment: "Teamspeak Comment",
        discription: "Voice Server Server",
        status: "Running",
        state: "Running",
    }],
    ["Assetto_Corsa", {
        name: "Assetto_Corsa",
        comment: "Assetto Corsa Server",
        discription: "Race sim server for the Game Assetto Corsa",
        status: "stopped",
        state: "stopped",
    }],
    ["Minecraft", {
        name: "Minecraft",
        comment: "Minecraft Server",
        discription: "Bedrock Minecraft server for windows",
        status: "Running",
        state: "Running",
    }]
]);

export default {
    all(): IServer[]{
        return [...Servers.values()];
    },

    get(id : string): IServer | undefined{
        let server = Servers.get(id)
        return server;
    },

    update(id : string, data: IServer) {
        return genericApi.put("Servers/" + id, data)
    },

    create(data: IServer) {
        return genericApi.post("Servers/", data)
    },

    delete(id : string) {
        return genericApi.delete("Servers/" + id)
    }
}