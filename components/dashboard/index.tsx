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

  function handleGenerateMnemonic() {
    const newMnemonic = generateMnemonic()
    setMnemonic(newMnemonic)
  }

  const mnemonicWords = mnemonic.split(' ')

  return (
    <div className="space-y-6">
      <Button onClick={handleGenerateMnemonic}>Generate Seed Phrase</Button>

      {mnemonic && (
        <Card>
          <CardHeader>
            <CardTitle>Your Seed Phrase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-2">
              {mnemonicWords.map((word, index) => (
                <div key={index} className="bg-secondary p-2 rounded">
                  <span className="font-mono">{word}</span>
                </div>
              ))}
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

