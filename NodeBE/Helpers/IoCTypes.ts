/* Types of injection implemented */
export enum StoreTypes {
    configuration,
    singleton,
    transient
}

export type AnyObject = { [x:string]: any }

export type DependencyStore<Dependency> = {
    instance?: Dependency,
    storeType: StoreTypes,
    factoryFunc: () => Dependency 
}

export type Dependencies<ContainerDef extends AnyObject> = Partial<{
    [K in keyof ContainerDef]: DependencyStore<ContainerDef[K]>
}>