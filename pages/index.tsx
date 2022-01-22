import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import TargetList from '../components/TargetList'
import useTarget from '../hooks/useTarget'
import useUser from '../hooks/useUser'
import userUser from '../hooks/useUser'
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient'

const Home: NextPage = () => {
  const { session, signOut, signInWithGoogle } = useUser();

  return (
    <div className="container flex justify-around py-8 mx-auto">
      <main>
        <TargetList />
      </main>
    </div>
  )
}

export default Home
