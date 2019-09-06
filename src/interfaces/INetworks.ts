
export interface INetworks {
    list:any[];
    activeNetwork:any;
    defaultNetwork: any;
    addNetwork(network: object): void;
    removeNetwork(network: string): void;
    setActive(network: string): void;
    initNetworks(): void;
    initDefaultNetworks(): void;
}