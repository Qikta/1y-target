import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ModalContent from '../components/ModalContent'
import useModal from '../hooks/useModal'
import { createContext, useCallback, useState } from 'react'
import useUser from '../hooks/useUser'

export const ModalContext = createContext<[]>({})

function MyApp({ Component, pageProps }: AppProps) {
  const { toggle, open, close } = useModal()

  return (
    <>
       <Header onClick={open} />
        <Component {...pageProps} />
        { toggle && <ModalContent onClick={close} /> }
        <Footer />
    </>
  ) 
}

export default MyApp
