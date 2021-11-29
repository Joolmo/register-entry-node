/* Custom, simple, DI inyection for IoC */
import { AnyObject , StoreTypes, Dependencies } from './IoCTypes'

export class Container<ContainerDef extends AnyObject> {
    // Private store of dependencies configurations
    protected readonly _dependencies: Dependencies<ContainerDef>
    // If not specified the store will be this by default
    protected readonly defaultStoreType = StoreTypes.singleton;
    // Public object containing getters for the dependencies
    public readonly dependencies: Partial<ContainerDef>

    public constructor() {
        this._dependencies = {};
        this.dependencies = {}
    }

    protected updateDependencyType(name: keyof ContainerDef, type: StoreTypes) {
        this._dependencies[name].storeType = type
    }

    protected singeltonGetter(name: keyof ContainerDef) {
        // Get sinlgeton or create it once if it does not exist
        if(!this._dependencies[name].instance) {
            this._dependencies[name].instance = this._dependencies[name].factoryFunc();
        }
        return this._dependencies[name].instance   
    }
    
    protected configGetter(name: keyof ContainerDef) {
        // Get configuration or create it once if it does not exist and don't let anyone modify it
        if(!this._dependencies[name].instance) {
            this._dependencies[name].instance = Object.freeze(this._dependencies[name].factoryFunc());
        }
        return this._dependencies[name].instance   
    }

    protected transientGetter(name: keyof ContainerDef) {
        // Always create a new instance that will be dellocated by the GC afterawards
        return this._dependencies[name].factoryFunc()
    }

    public Register<Key extends keyof ContainerDef>(name: Key, factoryFunc: (dependencies: Partial<ContainerDef>) => ContainerDef[Key]) {
        // Register dependency in dependecy array
        this._dependencies[name] = {
            factoryFunc: () => factoryFunc(this.dependencies),
            storeType: this.defaultStoreType,
        }

        Object.defineProperty(this.dependencies, name, {
            get: () => {
                // It is not needed to check the nullability of this._dependencies[name] as it is always created above
                switch(this._dependencies[name].storeType) {
                    case StoreTypes.singleton:  return this.singeltonGetter(name);
                    case StoreTypes.configuration: return this.configGetter(name);
                    case StoreTypes.transient: return this.transientGetter(name);
                    default: throw new Error("Not implemented")
                }
            },
            configurable: true,
            enumerable: true
        });
        
        // Return configuration functions for the registed dependency
        return {
            asSingelton: () => this.updateDependencyType(name, StoreTypes.singleton),
            asConfiguration: () => this.updateDependencyType(name, StoreTypes.configuration),
            asTransient: () => this.updateDependencyType(name, StoreTypes.transient)
        };
    }
}