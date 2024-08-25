import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './components/SolWallet';
import { EthWallet } from './components/EthWallet';
import PrimaryButton from './components/buttons/PrimaryButton';
import Navbar from './components/Navbar';


function App() {
  const [mnemonic, setMnemonic] = useState("");


  function handleMnemonics() {
    const mnemonics = generateMnemonic();
    setMnemonic(mnemonics);
  }

  const mnemonicWords: any[] = mnemonic.split(' ')
  return (
    <>
    <div>
      <div>
        <Navbar/>
      </div>
      <div className='pt-20 pl-20'>
        <div className='text-3xl font-bold'>
          Welcome to Nova, your own web based wallet
        </div>
        <div className='flex items-center pt-5'>
          <PrimaryButton onClick={handleMnemonics}>Create Seed Phrase</PrimaryButton>
        </div>
        <div>
          {mnemonic && <EthWallet mnemonic={mnemonic}/>}
        </div>
        <div>{mnemonic && mnemonicWords.map((word => <div>
            <div className='flex items-center pb-2'>
                <div className='border border-black p-2 flex items-center'>{word}</div>
          </div>
        </div>))}</div>
        <div>
          {mnemonic && <SolanaWallet mnemonic={mnemonic}/>}
        </div>
     </div>
    </div>
    </>
  )
}

export default App