import { Aeternity } from './protocols/Aeternity/Aeternity'

export default class Wallet {
    Aeternity: Aeternity;

    constructor() {
        this.Aeternity = new Aeternity();
    }
}