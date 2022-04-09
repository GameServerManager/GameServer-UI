
interface serverConfig {
    name : string 
    comment : string 
    description : string 
    image : string 
    mounts : mountingPoint[] 
    ports :  portMap[] 
    containerScripts :  serverScripts 
    variables : variable[] 
}