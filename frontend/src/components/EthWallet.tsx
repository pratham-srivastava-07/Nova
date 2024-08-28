import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const EthWallet = ({mnemonic}: {mnemonic: any}) => {
   const [index, setIndex] = useState(0);
   const [address, setAddress] = useState<any>([]);
   const {toast} = useToast()

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
        toast({
          title: "Added Wallet",
          description: "Added ETH wallet!"
        })
   }

   return <div>
        <div className="flex justify-start">
            <Button variant={"outline"} onClick={handleClick}>Add Eth Wallet</Button>
            {/* <button>Add Eth Wallet</button> */}
        </div>
        {address.map((publicKey: any, index: any) => <div key={index}>Eth - {publicKey}</div>)}
   </div>
}