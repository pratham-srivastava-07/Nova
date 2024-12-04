import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { 
  FaEye, 
  FaEyeSlash, 
  FaTrash, 
  FaPlusCircle, 
  FaCopy 
} from 'react-icons/fa';

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";

export function SolanaWallet({ mnemonic }: { mnemonic: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<Array<{
    publicKey: string;
    privateKey: string;
    isPrivateKeyVisible?: boolean;
  }>>([]);
  const { toast } = useToast();

  const handleAddWallet = async () => {
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
      setWallets(prev => [
        ...prev, 
        { 
          publicKey: keypair.publicKey.toBase58(), 
          privateKey: privateKeyHex,
          isPrivateKeyVisible: false 
        }
      ]);
      setCurrentIndex(prev => prev + 1);
      
      toast({
        title: "Wallet Generated",
        description: `Solana Wallet ${currentIndex + 1} Created`,
        variant: "default"
      });
    } catch (error) {
      console.error("Error generating Solana wallet:", error);
      toast({
        title: "Error",
        description: "Failed to generate Solana wallet",
        variant: "destructive"
      });
    }
  };

  const handleDeletion = (index: number) => {
    if (index >= 0 && index < wallets.length) {
      setWallets(prev => prev.filter((_, walletIndex) => walletIndex !== index));

      toast({
        title: "Wallet Deleted",
        description: `Deleted Solana Wallet ${index + 1}`,
        variant: "destructive"
      });
    }
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setWallets(prev => 
      prev.map((wallet, walletIndex) => 
        walletIndex === index 
          ? { ...wallet, isPrivateKeyVisible: !wallet.isPrivateKeyVisible } 
          : wallet
      )
    );
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied",
        description: `${type} copied to clipboard`,
        variant: "default"
      });
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Solana Wallet Generator</span>
          <div className="space-x-2">
            <Button 
              onClick={handleAddWallet} 
              className="hover:opacity-80 transition-opacity"
            >
              <FaPlusCircle className="mr-2" /> Add Wallet
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDeletion(wallets.length - 1)}
              disabled={wallets.length === 0}
              className="hover:opacity-80 transition-opacity"
            >
              <FaTrash className="mr-2" /> Delete Last
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {wallets.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            No wallets generated yet. Click &quot;Add Wallet&quot; to start.
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {wallets.map((wallet, index) => (
              <AccordionItem 
                key={index} 
                value={`wallet-${index}`} 
                className="border rounded-lg"
              >
                <AccordionTrigger className="px-4  transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="font-semibold h-10">Wallet {index + 1}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">Public Address</h3>
                        <div className="flex items-center space-x-2">
                          <code className=" px-2 py-1 rounded text-sm">
                            {wallet.publicKey}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(wallet.publicKey, "Public Address")}
                          >
                            <FaCopy />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">Private Key</h3>
                        <div className="flex items-center space-x-2">
                          <code className={cn(
                            "bg-gray-100 px-2 py-1 rounded text-sm",
                            wallet.isPrivateKeyVisible ? "text-black" : "text-gray-500"
                          )}>
                            {wallet.isPrivateKeyVisible 
                              ? <div>{ wallet.privateKey } <br /></div>
                              : '*'.repeat(wallet.privateKey.length/2)}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => togglePrivateKeyVisibility(index)}
                          >
                            {wallet.isPrivateKeyVisible ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                          {wallet.isPrivateKeyVisible && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(wallet.privateKey, "Private Key")}
                            >
                              <FaCopy />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeletion(index)}
                      >
                        <FaTrash className="mr-2" /> Delete Wallet
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}