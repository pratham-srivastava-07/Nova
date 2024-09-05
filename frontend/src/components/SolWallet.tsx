import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<any[]>([]);
  const { toast } = useToast();

  async function handleClick() {
    try {
      // Generate seed buffer from mnemonic
      const seed = await mnemonicToSeed(mnemonic);

      // Derive path for the keypair
      const path = `m/44'/501'/${currentIndex}'/0'`;
      const { key: derivedSeed } = derivePath(path, seed.toString("hex"));

      // Create keypair from derived seed
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      // Convert Uint8Array to hex string for the private key
      const privateKeyHex = Array.from(secret)
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');

      // Update state with both public and private keys
      setWallets([...wallets, { publicKey: keypair.publicKey.toBase58(), privateKey: privateKeyHex }]);
      setCurrentIndex(currentIndex + 1);
      
      toast({
        title: "Added Wallet",
        description: "Added SOL wallet!",
      });
    } catch (error) {
      console.error("Error generating Solana wallet:", error);
    }
  }

  function handleDeletion(i: number) {
    if(i >= 0 && i < wallets.length) {
        const newWallets = wallets.filter((_, walletIndex) => walletIndex !== i);
        setWallets(newWallets);

        toast({
          title: "Deleted Wallet",
          description: `Deleted Wallet ${i+1 }`,
        });
    }
  }

  function togglePrivateKeyVisibility(index: number) {
    const updatedWallets = wallets.map((wallet, walletIndex) => 
      walletIndex === index ? { ...wallet, isPrivateKeyVisible: !wallet.isPrivateKeyVisible } : wallet
    );
    setWallets(updatedWallets);
  }

  return (
    <div>
      <div className="flex justify-start items-center">
        <Button variant={"outline"} onClick={handleClick}>
          Add Sol Wallet
        </Button>
        <Button variant={"outline"} onClick={() => handleDeletion(wallets.length - 1)} disabled={wallets.length === 0}>
          Delete Last Wallet
        </Button>
      </div>
      {wallets.map((wallet, index) => (
  <Accordion type="single" collapsible className="w-full mt-3 pl-5" key={index}>
    <AccordionItem value={`item-${index}`}>
      <AccordionTrigger><Button>{`Wallet ${index + 1}`}</Button></AccordionTrigger>
      <AccordionContent>
        <div className="p-4 rounded-md shadow-md max-w-6xl">
          <div className="mb-2">
            <strong>Sol Address:</strong> {wallet.publicKey}
          </div>
          <div className="relative ml-2 flex">
                  <button
                    type="button"
                    onClick={() => togglePrivateKeyVisibility(index)}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2"
                  >
                    {wallet.isPrivateKeyVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <span className="font-bold text-md">Private Key:</span>
                  <span className="ml-2">
                    {wallet.isPrivateKeyVisible ? wallet.privateKey : '•••••••••••••••••••••••••••••'}
                  </span>
                 
          </div>
          <Button variant="outline" onClick={() => handleDeletion(index)} className="mt-2">
               Delete Wallet {index + 1}
          </Button>
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
))}

    </div>
  );
}
