import styles from '../styles/Home.module.css'
import Image from 'next/image'
import path from 'path';

export default function Footer () {
  return (
    <footer className="text-center lg:text-left bg-gray-100 text-gray-600">
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
        <div>
          <ul>
            <li>
              <a href="">Privacy</a>
            </li>
            <li>
              <a href="">terms</a>
            </li>
          </ul>
        </div>
        <div className="text-gray-700 text-center p-8">
          © 2022 Copyright:
          <span className={styles.logo}>
          </span>
          <a className="text-gray-800" href="https://localhost:3000/">One Year Target</a>
        </div>

      </footer>
  )
}