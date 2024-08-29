import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './components/SolWallet';
import { EthWallet } from './components/EthWallet';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signin from './pages/Signin';
import { useAuth } from './providers/AuthProviders';
import { Button } from './components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../src/components/ui/accordion"

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [dropDown, setDropDown] = useState(false);
  const {isAuthenticated} = useAuth()
  const [position, setPosition] = useState("bottom")
  const navigate = useNavigate()


  function handleMnemonics() {
    const mnemonics = generateMnemonic();
    setMnemonic(mnemonics);
    setDropDown(true)
  }

  const mnemonicWords: any[] = mnemonic.split(' ')
  return (
    <>
    
    {/* <Signup/> */}
    <Routes>
      <Route path='/signup' element={<Signup/>} />
      <Route path='/' element={
        <div>
        <div>
          <Navbar/>
        </div>
        <div className='pt-20 pl-20'>
          <div className='text-3xl font-bold'>
            Welcome to Nova, your own web based wallet
          </div>
          <div className='flex items-center pt-5'>
                {isAuthenticated &&
                  <Button variant="outline" onClick={handleMnemonics}>Generate Seed Phrase</Button>
                }
              </div>
              <div className='pt-5'>
                {mnemonic && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Your Seed Phrase</AccordionTrigger>
                      <AccordionContent>
                        <div className=' p-4 rounded-md shadow-md max-w-6xl'>
                          {mnemonicWords.map((word, index) => (
                            index % 4 === 0 && (
                              <div key={index} className='flex flex-wrap pb-2 pt-4 pl-28'>
                                {mnemonicWords.slice(index, index + 4).map((w, i) => (
                                  <div key={i} className='w-1/4'>{w}</div>
                                ))}
                              </div>
                            )
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </div>
          <div>
            <h1>{isAuthenticated.toString()}</h1>
              {!isAuthenticated && <>
                  <div className="flex space-x-3 pt-10">
                    <Button onClick={() => navigate("/signup")}>Signup</Button>
                    <Button onClick={() => navigate("/login")}>Login</Button>

                  </div>
              </>}
          </div>
         
      {/* { mnemonic && (
                  <div className='pt-5 '>
                    <div className='bg-gray-100 p-4 rounded-md shadow-md max-w-6xl'>
                      <div className='font-bold mb-2'>Your Seed Phrase:</div>
                      <div>
                        {mnemonic && mnemonicWords.map((word, index) => (
                          index % 4 === 0 && (
                            <div key={index} className='flex flex-wrap pb-2 pt-4 pl-28'>
                              {mnemonicWords.slice(index, index + 4).map((w, i) => (
                                <div key={i} className='w-1/4'>{w}</div>
                              ))}
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  </div>
                )} */}
          <div className="flex items-center space-x-4">
            <div className='pt-5'>
                {mnemonic && <EthWallet mnemonic={mnemonic}/>}
            </div>
            <div className='pt-5'>
                {mnemonic && <SolanaWallet mnemonic={mnemonic}/>}
            </div>
          </div>
       </div>
      </div>
      } />
      <Route path='/login' element={<Signin/>} />
    </Routes>
    </>
  )
}

export default App