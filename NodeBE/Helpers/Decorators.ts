export type Endpoint = {methodName: string, path: string}

export const Handler: (basePath: string) => ClassDecorator = (basePath) => {
    return (target) => { 
        target.prototype.basePath = basePath;
    }
}

export const Listener: (path: string) => MethodDecorator = (path) => {
    return (target: any, name, _) => {
        target.endpoints = target.endpoints ?? []

        target.endpoints.push({
            methodName: name.toString(),
            path
        })
    }
}