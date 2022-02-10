import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ModalContent from '../components/ModalContent'
import useModal from '../hooks/useModal'
import { createContext, useCallback, useState } from 'react'
import useUser from '../hooks/useUser'
import '@uiw/react-heat-map/dist.css';
import GlobalStateProvider from '../context/global-state-provider'

function MyApp({ Component, pageProps }: AppProps) {
  const { toggle, open, close } = useModal()

  return (
    <>
      <GlobalStateProvider>
        <Header onClick={open} />
        <Component {...pageProps} onClick={open} />
        { toggle && <ModalContent onClick={close} /> }
        <Footer />
      </GlobalStateProvider>
    </>
  ) 
}

export default MyApp
