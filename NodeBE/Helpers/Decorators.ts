export type Endpoint = {methodName: string, path: string}

export const Handler: (basePath: string) => ClassDecorator = (basePath) => {
    return (target) => { 
        target.prototype.basePath = basePath;
    }
}

export const Listener: (path: string) => MethodDecorator = (path) => {
    return (target: Object & {basePath: String, endpoints: Endpoint[]}, name, _) => {
        if (!target.endpoints) {
            target.endpoints = []
        }
        
        target.endpoints.push({
            methodName: name.toString(),
            path: `${target.basePath}/${path}`
        })
    }
}

export class IpcMainHandler {
    constructor () {
        this.endpoints = []
    }
    public endpoints: Endpoint[];
}