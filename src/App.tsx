import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './components/SolWallet';
import { EthWallet } from './components/EthWallet';
import PrimaryButton from './components/buttons/PrimaryButton';


function App() {
  const [mnemonic, setMnemonic] = useState("");


  function handleMnemonics() {
    const mnemonics = generateMnemonic();
    setMnemonic(mnemonics);
  }


  return (
    <>
     <div className='pt-20 pl-20'>
        <div className='text-3xl font-bold'>
          Web based Wallet
        </div>
        <div className='flex items-center pt-5'>
          <PrimaryButton onClick={handleMnemonics}>Create Seed Phrase</PrimaryButton>
        </div>
        <div>
          {mnemonic && <EthWallet mnemonic={mnemonic}/>}
        </div>
        <div>
          {mnemonic && <SolanaWallet mnemonic={mnemonic}/>}
        </div>
     </div>
    </>
  )
}

export default App