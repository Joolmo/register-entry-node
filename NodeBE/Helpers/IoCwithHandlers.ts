import { ipcMain } from "electron";
import { Endpoint } from "./Decorators";
import { Container } from "./IoC";
import { AnyObject } from "./IoCTypes";

export class ContainerWithHandlers<T extends AnyObject> extends Container<T> {
    public RegisterHandler<Key extends keyof T>(key: Key, factoryFunc: (dependencies: Partial<T>) => T[Key]) {
        this.Register(key, factoryFunc).asTransient()

        const handlerEndpoints = this.dependencies[key].endpoints as Endpoint[]

        handlerEndpoints.forEach(endPoint => {
            ipcMain.handle(endPoint.path, (_, ...args) => {
                const handler = this.dependencies[key]
                return handler[endPoint.methodName](args)
            })
        })
    }
}