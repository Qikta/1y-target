import styles from '../styles/Home.module.css'
import Image from 'next/image'
import path from 'path';

export default function Footer () {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  return (
    <footer className="footer bg-gray-100 relative pt-1 border-b-2">
      <div className="container mx-auto px-6">
        <div className="sm:flex sm:mt-8">
          <div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mb-2">About</span>
              <span className="my-2"><a href="about" className="text-gray-700 text-md hover:text-gray-500">OYTについて</a></span>
              {/* <span className="my-2"><a href="#" className="text-blue-700  text-md hover:text-blue-500">link 1</a></span>
              <span className="my-2"><a href="#" className="text-blue-700  text-md hover:text-blue-500">link 1</a></span> */}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">Legal</span>
              <span className="my-2"><a href="terms" className="text-gray-700 text-md hover:text-gray-500">利用規約</a></span>
              <span className="my-2"><a href="privacy" className="text-gray-700 text-md hover:text-gray-500">Privacy Policy</a></span>
              {/* <span className="my-2"><a href="#" className="text-blue-700  text-md hover:text-blue-500">link 1</a></span>
              <span className="my-2"><a href="#" className="text-blue-700 text-md hover:text-blue-500">link 1</a></span> */}
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">Contact</span>
              <span className="my-2"><a href="https://twitter.com/qikta" className="text-gray-700 text-md hover:text-gray-500">Twitter</a></span>
              {/* <span className="my-2"><a href="#" className="text-blue-700  text-md hover:text-blue-500">link 1</a></span>
              <span className="my-2"><a href="#" className="text-blue-700  text-md hover:text-blue-500">link 1</a></span> */}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6">
        <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
          <div className="sm:w-2/3 text-center py-6">
              <p className="text-sm text-gray-700 font-bold mb-2">
              © 2022 Copyright:
              <span className={styles.logo} />
              <a className="text-gray-800" href={baseUrl}>One Year Target</a>
              </p>
          </div>
        </div>
      </div>
    </footer>
  )
}