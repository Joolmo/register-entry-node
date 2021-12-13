export type Endpoint = { methodName: string, path: string }

export const Handler: (basePath: string) => ClassDecorator = (basePath) => {
    return (target: Function) => { 
        const endpoints = target.prototype._endpoints as Endpoint[] 
        target.prototype._endpoints = endpoints.map(endpoint => ({
            methodName: endpoint.methodName,
            path: `${basePath}/${endpoint.path}`
        }))
    }
}

export const Listener: (path: string) => MethodDecorator = (path) => {
    return (target: any, name, _) => {
        target._endpoints = (target._endpoints ?? []) as Endpoint[]
    
        target._endpoints.push({
            methodName: name.toString(),
            path
        })
    }
}

export class IPCMainHandler {    
    public get endpoints(): Endpoint[] {
        return (this as any)._endpoints;
    }
}