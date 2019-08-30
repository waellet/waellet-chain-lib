import Wallet from './index'


const start = async () => {
    let wallet = new Wallet();
    await wallet.Aeternity.setup()
    wallet.Aeternity.networks.addNetwork({
        name:"Tst",
        internalUrl:"asds",
        networkId:"asds",
        explorerUrl:"sad",
        middlewareUrl:"sad"
    })

    wallet.Aeternity.networks.setActive("https://sdk-mainnet.aepps.com")
    // console.log(wallet.Aeternity.networks.activeNetwork.internalUrl)

    let tx = await wallet.Aeternity.tx.prepare("spendTx",{ 
        recipientId:"ak_2dY7HSsxH3yGL5j7mNvYYjFGTZwqtLNyoLSSaymn1wLKFSneeQ",
        senderId:"ak_2ELPCWzcTdiyYuumjaV4D7kE843d1Ts27zH1Y2LBMKDbNtfq1Q", 
        amount:100,
        fee:0.0001,
        payload:''
    })

    let secretKey = Buffer.from("5a4f1fb3cd5707368361fa04b667715ff6c5b38bd301a055b2dafb714ca6d930a1f9161de91531699f8422de282a816aaa0bc98c64dfce819ef8c857d608cfed",'hex')
    let signed = await wallet.Aeternity.tx.sign(secretKey,tx)
    let broadcast = await wallet.Aeternity.tx.broadcast(signed)

    console.log(broadcast)
}


start()