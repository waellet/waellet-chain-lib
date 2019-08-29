import { Network } from '../../interfaces/Network';

export class AeternityNetwork implements Network {
    public name: string;
    public active: boolean;
    public internalUrl: string;
    public url: string;
    public networkId:string;
    public middlewareUrl:string;
    public explorerUrl:string;

    constructor( name, active, internalUrl, networkId, middlewareUrl, explorerUrl ) {
        let params = Array.from(arguments);
        params.forEach(p => {
            if(typeof p == 'undefined' || ( typeof p == 'string' && p == '' )) {
                throw new Error("Please specify all required params")
            }
        })
        this.name = name;
        this.active = active;
        this.internalUrl = internalUrl;
        this.url = internalUrl;
        this.networkId = networkId;
        this.middlewareUrl = middlewareUrl;
        this.explorerUrl = explorerUrl;
    }
    
    
}