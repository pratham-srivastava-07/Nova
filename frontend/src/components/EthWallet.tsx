import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export const EthWallet = ({ mnemonic }: { mnemonic: any }) => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState<any[]>([]);
  const { toast } = useToast();

  async function handleClick() {
    const seed = await mnemonicToSeed(mnemonic);
    console.log(seed);

    const path = `m/44'/60'/${index}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const childNode = hdNode.derivePath(path);
    const privateKey = childNode.privateKey;
    const wallet = new Wallet(privateKey);
    
    setWallets([...wallets, { address: wallet.address, privateKey: privateKey }]);
    setIndex(index + 1);
    
    toast({
      title: "Added Wallet",
      description: "Added ETH wallet!",
    });
  }

  return (
    <div>
      <div className="flex justify-start">
        <Button variant={"outline"} onClick={handleClick}>
          Add Eth Wallet
        </Button>
      </div>
      {wallets.map((wallet, idx) => (
        <div className="mt-3" key={idx}>
          <div>Eth Address: {wallet.address}</div>
          <div>Private Key: {wallet.privateKey}</div>
        </div>
      ))}
    </div>
  );
};
