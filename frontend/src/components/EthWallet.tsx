import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

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

    setWallets([...wallets, { address: wallet.address, privateKey: privateKey, isPrivateKeyVisible: false }]);
    setIndex(index + 1);

    toast({
      title: "Added Wallet",
      description: "Added ETH wallet!",
    });
  }

  function togglePrivateKeyVisibility(idx: number) {
    const updatedWallets = wallets.map((wallet, walletIndex) =>
      walletIndex === idx
        ? { ...wallet, isPrivateKeyVisible: !wallet.isPrivateKeyVisible }
        : wallet
    );
    setWallets(updatedWallets);
  }

  function handleDeletion(idx: number) {
    if(idx >= 0 && idx < wallets.length) {
      const updatedWallets = wallets.filter((_, walletIndex) => walletIndex !== idx)
      setWallets(updatedWallets);

      toast({
        title: "Deleted Wallet",
        description: `Deleted Eth Wallet ${idx + 1}`,
      });
    }
  }

  return (
    <div>
      <div className="flex justify-start items-center space-x-3">
        <Button variant={"outline"} onClick={handleClick}>
          Add Eth Wallet
        </Button>
        <Button variant={"destructive"} onClick={() => handleDeletion(wallets.length - 1)} disabled={wallets.length === 0}>Delete Last Wallet</Button>
      </div>
      {wallets.map((wallet, idx) => (
        <Accordion type="single" collapsible className="w-full mt-3 pl-5" key={idx}>
          <AccordionItem value={`item-${idx}`}>
            <AccordionTrigger><Button>{`Wallet ${idx + 1}`}</Button></AccordionTrigger>
            <AccordionContent>
              <div className="p-4 rounded-md shadow-md max-w-6xl">
                <div className="mb-2">
                  <strong>Eth Address:</strong> {wallet.address}
                </div>
                <div className="relative ml-2 flex">
                  {/* Toggle button */}
                  <button
                    type="button"
                    onClick={() => togglePrivateKeyVisibility(idx)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                  >
                    {wallet.isPrivateKeyVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  {/* Conditionally render private key */}
                  <h1 className="font-bold text-md pr-3">Private Key:</h1>
                  <span className="ml-2">
                    {wallet.isPrivateKeyVisible ? wallet.privateKey : '********************************************************'}
                  </span>
                </div>
                {/* Delete button */}
                <Button variant={"destructive"} className="mt-3" onClick={() => handleDeletion(idx)}>
                  Delete Wallet
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};
