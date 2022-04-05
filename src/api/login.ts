import genericApi from "./genericApi";

export default {

    login(userName: string, password: string) : Promise<string>{
        return genericApi.Authenticate({
            userName: userName,
            password: password
        })
    },

    register(userName: string, password: string, maudiSecret: string) : Promise<void>{
        let registerInfo = {
            userName: userName,
            password: password,
            maudiSecret: maudiSecret
        }
        return genericApi.Register(registerInfo)
    }
}