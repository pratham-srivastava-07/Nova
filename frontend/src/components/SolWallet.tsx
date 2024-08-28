import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Button } from "./ui/button";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState<string[]>([]);

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

      // Update state
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
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
      {publicKeys.map((p, index) => (
        <div key={index}>Sol - {p}</div>
      ))}
    </div>
  );
}
