import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import NewButton from "./buttons/NewButton";

export function SolanaWallet({ mnemonic }: {mnemonic: any}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState<any>([]);


  async function handleClick(){
        const seed = await mnemonicToSeed(mnemonic);
        console.log(seed);
        
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString()).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex + 1);
        setPublicKeys([...publicKeys, keypair.publicKey]);
    }

    return <div>
        <div className="flex justify-start">
            <NewButton onClick={handleClick}>Add Sol wallet</NewButton>
        </div>
            {publicKeys.map((p: any) => <div>
               Sol - {p.toBase58()}
            </div>)}
    </div>
}