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
import Seo from '../components/SeoHeader'

function MyApp({ Component, pageProps }: AppProps) {
  const { toggle, open, close } = useModal()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? '';

  return (
    <>
      <GlobalStateProvider>
        <Seo
          pageTitle='One Year Target'
          pageDescription='One Year Target'
          pagePath={`${baseUrl}`}
          pageImgWidth={1280}
          pageImgHeight={960}
        />
        <Header onClick={open} />
        <Component {...pageProps} onClick={open} />
        { toggle && <ModalContent onClick={close} /> }
        <Footer />
      </GlobalStateProvider>
    </>
  ) 
}

export default MyApp
