import { Networks } from '../../interfaces/Networks';
import { AeternityNetwork } from './AeternityNetwork';

export class AeternityNetworks implements Networks {
    public list:Array<AeternityNetwork> = [];
    public defaultNetwork: AeternityNetwork;

    constructor() {
        this.initDefaultNetworks();
    }

    public get activeNetwork(): AeternityNetwork {
        return this.getActiveNetwork()
    }
 
    public initDefaultNetworks():void {
        this.defaultNetwork = this.generateNetwork({
            name: 'Fortuna-net',
            pathName: 'mainnet',
            active:false,
            networkId: 'ae_mainnet'
        })
        this.list.push(this.defaultNetwork)
        this.list.push(this.generateNetwork({
            name: 'Testnet',
            pathName: 'testnet',
            active:true,
            networkId: 'ae_uat'
        }))
    }

    public addNetwork({ name, internalUrl, networkId, explorerUrl, middlewareUrl }: { name: string, internalUrl: string, networkId:string, explorerUrl: string, middlewareUrl: string }): void {

        let network = this.generateAeternityNetwork({
            name,
            active:true,
            internalUrl,
            networkId,
            explorerUrl,
            middlewareUrl
        })

        console.log(network.internalUrl)
        this.list.push(network)
    }

    public setActive(url: string): void {
        this.list = this.list.map(n => {
            n.active = false
            return n
        })
        this.list = this.list.map(n =>  {
            if(n.internalUrl == url) {
                n.active = true
            }
            return n
        })
    }

    public removeNetwork(url: string): void {
        this.list = this.list.filter(n => n.url != url);
    }

    public initNetworks(): void {

    }

    private getUrl(networkName): string {
        return `https://sdk-${networkName}.aepps.com`
    }

    private getMiddlewareUrl(networkName = ''): string {
        return `https://${networkName}${networkName ? '.' : ''}mdw.aepps.com`
    }   

    private getExplorerUrl(networkName = ''): string {
        return `https://${networkName}${networkName ? '.' : ''}explorer.aepps.com`
    }   

    private generateAeternityNetwork({ name, active, internalUrl, networkId, explorerUrl, middlewareUrl }): AeternityNetwork {
        return new AeternityNetwork(
            name,
            active,
            internalUrl,
            networkId,
            explorerUrl,
            middlewareUrl
        )
    }

    private generateNetwork ({ name, pathName, active, networkId }): AeternityNetwork {
        return this.generateAeternityNetwork({
            name,
            active,
            internalUrl: this.getUrl(pathName),
            networkId,
            explorerUrl: this.getExplorerUrl(pathName),
            middlewareUrl: this.getMiddlewareUrl(pathName)
        })
    }

    private getActiveNetwork(): AeternityNetwork {
        return this.list.filter(n => n.active)[0]
    }
 }