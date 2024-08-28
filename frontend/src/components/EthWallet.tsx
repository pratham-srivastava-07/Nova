import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

import { Button } from "./ui/button";

export const EthWallet = ({mnemonic}: {mnemonic: any}) => {
   const [index, setIndex] = useState(0);
   const [address, setAddress] = useState<any>([]);

   async function handleClick() {
        const seed = await mnemonicToSeed(mnemonic);
        console.log(seed);
        
        const path = `m/44'/60'/${index}'/0'`;
        const hdNode = HDNodeWallet.fromSeed(seed)
        const childNode = hdNode.derivePath(path);
        const privateKey = childNode.privateKey;
        const wallet =  new Wallet(privateKey);
        setAddress([...address, wallet.address]);
        setIndex(index + 1);
   }

   return <div>
        <div className="flex justify-start">
            <Button variant={"outline"} onClick={handleClick}>Add Eth Wallet</Button>
            {/* <button>Add Eth Wallet</button> */}
        </div>
        {address.map((publicKey: any) => <div>Eth - {publicKey}</div>)}
   </div>
}