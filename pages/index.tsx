import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import TargetList from '../components/TargetList'
import { TopSection } from '../components/TopSection'
import useModal from '../hooks/useModal'
import useTarget from '../hooks/useTarget'
import useUser from '../hooks/useUser'
import userUser from '../hooks/useUser'
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/supabaseClient'

const Home: NextPage = (props: any) => {

  return (
    <div className="container justify-around mx-auto">
      <main>
        <TopSection onClick={props.onClick} />
        <TargetList />
      </main>
    </div>
  )
}

export default Home
