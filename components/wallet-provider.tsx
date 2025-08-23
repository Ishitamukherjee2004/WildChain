"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"

interface WalletContextType {
  account: string | null
  isConnected: boolean
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isLoading: boolean
  error: string | null
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const connectionRequestRef = useRef<Promise<string[]> | null>(null)

  const isConnected = !!account

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      setError("Please install MetaMask to connect your wallet")
      return
    }

    if (connectionRequestRef.current) {
      setError("Connection request already in progress. Please wait...")
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      connectionRequestRef.current = window.ethereum.request({
        method: "eth_requestAccounts",
      })

      const accounts = await connectionRequestRef.current

      if (accounts.length > 0) {
        setAccount(accounts[0])
        localStorage.setItem("walletConnected", "true")
      }
    } catch (error: any) {
      console.error("Failed to connect wallet:", error)

      if (error.code === 4001) {
        setError("Wallet connection was cancelled. Please try again if you'd like to connect.")
      } else if (error.code === -32002) {
        setError("A wallet connection request is already pending. Please check MetaMask and try again in a moment.")
      } else {
        setError("Failed to connect wallet. Please try again.")
      }
    } finally {
      setIsLoading(false)
      connectionRequestRef.current = null
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setError(null)
    localStorage.removeItem("walletConnected")
    connectionRequestRef.current = null
  }

  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined" && localStorage.getItem("walletConnected")) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          })
          if (accounts.length > 0) {
            setAccount(accounts[0])
          }
        } catch (error) {
          console.error("Failed to check wallet connection:", error)
        }
      }
    }

    checkConnection()

    if (typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          disconnectWallet()
        }
      })
    }

    return () => {
      if (typeof window.ethereum !== "undefined") {
        window.ethereum.removeAllListeners("accountsChanged")
      }
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        account,
        isConnected,
        connectWallet,
        disconnectWallet,
        isLoading,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

declare global {
  interface Window {
    ethereum?: any
  }
}
