import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39"

function App() {
  const [mnemonic, setMnemonic] = useState("");

  
  return <div>
        <button onClick={async function() {
        const mn = await generateMnemonic();
        setMnemonic(mn)
      }}>
        Create Seed Phrase
      </button>
      <input type="text" value={mnemonic}></input>
  </div>
}

export default App
