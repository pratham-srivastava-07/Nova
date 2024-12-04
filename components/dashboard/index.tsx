'use client'

import { useState } from 'react'
import { generateMnemonic } from 'bip39'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SolanaWallet } from '../contents/sol-wallet'
import { EthWallet } from '../contents/eth-wallet'

export default function WalletDashboard() {
  const [mnemonic, setMnemonic] = useState('')
  const [isEditing, setIsEditing] = useState(false) // State to toggle edit mode

  function handleGenerateMnemonic() {
    const newMnemonic = generateMnemonic()
    setMnemonic(newMnemonic)
  }

  const mnemonicWords = mnemonic.split(' ')

  // Handle changes in the mnemonic word
  const handleWordChange = (index: number, value: string) => {
    const updatedMnemonic = [...mnemonicWords]
    updatedMnemonic[index] = value
    setMnemonic(updatedMnemonic.join(' '))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-center items-center">
        <Button onClick={handleGenerateMnemonic}>Generate Seed Phrase</Button>
        {/* <Link href={"/api/auth/signout"}><Button>Logout</Button></Link> */}
      </div>

      {mnemonic && (
        <Card>
          <CardHeader>
            <CardTitle>Your Seed Phrase</CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              // Display input fields for each word when in editing mode
              <div className="grid grid-cols-4 gap-2">
                {mnemonicWords.map((word, index) => (
                  <div key={index} className="p-2 rounded">
                    <input
                      type="text"
                      value={word}
                      onChange={(e) => handleWordChange(index, e.target.value)}
                      className="bg-secondary p-2 rounded text-sm"
                    />
                  </div>
                ))}
              </div>
            ) : (
              // Display the mnemonic words normally
              <div className="grid grid-cols-4 gap-2">
                {mnemonicWords.map((word, index) => (
                  <div key={index} className="bg-secondary p-2 rounded">
                    <span className="font-mono">{word}</span>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4">
              <Button onClick={() => setIsEditing(!isEditing)} className="w-full">
                {isEditing ? 'Save Seed Phrase' : 'Edit Seed Phrase'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {mnemonic && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="solana">
            <AccordionTrigger>Solana Wallet</AccordionTrigger>
            <AccordionContent>
              <SolanaWallet mnemonic={mnemonic} />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ethereum">
            <AccordionTrigger>Ethereum Wallet</AccordionTrigger>
            <AccordionContent>
              <EthWallet mnemonic={mnemonic} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  )
}
