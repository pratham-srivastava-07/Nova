import React, { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaEye, FaEyeSlash, FaPlusCircle, FaTrash } from "react-icons/fa";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { AxiosError } from "axios";

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [index, setIndex] = useState(0);
  const [wallets, setWallets] = useState<Array<{
    address: string;
    privateKey: string;
    isPrivateKeyVisible: boolean;
  }>>([]);
  const { toast } = useToast();

  const handleAddWallet = async () => {
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const path = `m/44'/60'/${index}'/0'`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const childNode = hdNode.derivePath(path);
      const privateKey = childNode.privateKey;
      const wallet = new Wallet(privateKey);

      setWallets(prevWallets => [
        ...prevWallets, 
        { 
          address: wallet.address, 
          privateKey: privateKey, 
          isPrivateKeyVisible: false 
        }
      ]);

      setIndex(prevIndex => prevIndex + 1);

      toast({
        title: "Wallet Added",
        description: `Generated Wallet ${index + 1}`,
        variant: "default"
      });
    } catch (error) {
        if(error instanceof AxiosError) {
          toast({
            title: "Error",
            description: "Failed to generate wallet",
            variant: "destructive"
          });
        }
    }
  };

  const togglePrivateKeyVisibility = (idx: number) => {
    setWallets(prevWallets => 
      prevWallets.map((wallet, walletIndex) => 
        walletIndex === idx 
          ? { ...wallet, isPrivateKeyVisible: !wallet.isPrivateKeyVisible }
          : wallet
      )
    );
  };

  const handleDeletion = (idx: number) => {
    if (idx >= 0 && idx < wallets.length) {
      setWallets(prevWallets => 
        prevWallets.filter((_, walletIndex) => walletIndex !== idx)
      );

      toast({
        title: "Wallet Deleted",
        description: `Deleted Wallet ${idx + 1}`,
        variant: "destructive"
      });
    }
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
          <span>Ethereum Wallet Generator</span>
          <div className="flex space-x-2">
            <Button 
              onClick={handleAddWallet} 
              className="hover:bg-green-100 transition-colors"
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
            {wallets.map((wallet, idx) => (
              <AccordionItem 
                key={idx} 
                value={`wallet-${idx}`} 
                className="border rounded-lg"
              >
                <AccordionTrigger className="px-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="font-semibold">Wallet {idx + 1}</div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">Address</h3>
                        <div className="flex items-center space-x-2">
                          <code className="px-2 py-1 rounded text-sm overflow-hidden text-ellipsis">
                            {wallet.address}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(wallet.address, "Address")}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">Private Key</h3>
                        <div className="flex items-center space-x-2">
                          <code className={cn(
                            "bg-gray-100 px-2 py-1 rounded text-sm max-w-1/2 overflow-hidden text-ellipsis",
                            wallet.isPrivateKeyVisible ? "text-black" : "text-gray-500"
                          )}>
                            {wallet.isPrivateKeyVisible 
                              ? wallet.privateKey 
                              : '*'.repeat(wallet.privateKey.length)}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => togglePrivateKeyVisibility(idx)}
                          >
                            {wallet.isPrivateKeyVisible ? <FaEyeSlash /> : <FaEye />}
                          </Button>
                          {wallet.isPrivateKeyVisible && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(wallet.privateKey, "Private Key")}
                            >
                              Copy
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeletion(idx)}
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
};
