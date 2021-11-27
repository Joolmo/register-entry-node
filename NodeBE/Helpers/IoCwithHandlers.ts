import { ipcMain } from "electron";
import { Endpoint } from "./Decorators";
import { Container } from "./IoC";
import { AnyObject } from "./IoCTypes";

export class ContainerWithHandlers<T extends AnyObject> extends Container<T> {
    public RegisterHandler<Key extends keyof T>(name: Key, factoryFunc: (dependencies: Partial<T>) => T[Key]) {
        this.Register(name, factoryFunc).asTransient()

        const handlerInstance = this.dependencies[name]
        const endpoints = handlerInstance.endpoints as Endpoint[]
        const basePath = handlerInstance.basePath as string

        endpoints.forEach(endPoint => {
            ipcMain.handle(`${basePath}/${endPoint.path}`, (_, ...args) => {
                const handler = this.dependencies[name]
                console.log(args);
                return handler[endPoint.methodName](args[0])
            })
        })
    }
}