import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

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

  return (
    <div>
      <div className="flex justify-start">
        <Button variant={"outline"} onClick={handleClick}>
          Add Sol Wallet
        </Button>
      </div>
      {wallets.map((wallet, index) => (
        <div className="mt-3" key={index}>
          <div>Sol Address: {wallet.publicKey}</div>
          <div>Private Key: {wallet.privateKey}</div>
        </div>
      ))}
    </div>
  );
}
