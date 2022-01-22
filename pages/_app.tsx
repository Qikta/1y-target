import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ModalContent from '../components/ModalContent'
import useModal from '../hooks/useModal'
import { createContext, useCallback, useState } from 'react'

export const ModalContext = createContext<[]>({})

function MyApp({ Component, pageProps }: AppProps) {
  // const { toggle, open, close } = useModal()
  const [toggle, setToggle] = useState(false)

  const open = () => {
    console.log('open');
    
    setToggle(true)}

  return (
    <>
       <Header onClick={open} />
        <Component {...pageProps} />
        { toggle && <ModalContent /> }
        <Footer />
    </>
  ) 
}

export default MyApp
