import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './components/SolWallet';
import { EthWallet } from './components/EthWallet';


function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
     <div className='flex justify-center items-center pt-20'>
      <input type="text" value={mnemonic}></input>
        <button onClick={async function() {
          const mn = generateMnemonic();
          setMnemonic(mn)
        }}>
          Create Seed Phrase
        </button>
        {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
        {mnemonic && <EthWallet mnemonic={mnemonic} />}
     </div>
    </>
  )
}

export default App