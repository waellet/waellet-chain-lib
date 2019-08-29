import { Network } from './Network';

export interface Networks {
    list:Network[];
    activeNetwork:Network;
    defaultNetwork: Network;
    addNetwork(network: object): void;
    removeNetwork(network: string): void;
    setActive(network: string): void;
    initNetworks(): void;
    initDefaultNetworks(): void;
}