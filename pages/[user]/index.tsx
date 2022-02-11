import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import Target from '../../components/Target'
import { Context } from '../../components/TargetList'
import { GlobalContext } from '../../context/global-state-provider'
import { ITarget } from '../../hooks/useTarget'
import useUser from '../../hooks/useUser'
import { definitions } from '../../types/entities/supabase'
import { supabase } from '../../utils/supabaseClient'

// @ts-ignore
const Main = () => {
  const {targetList, profile} = useContext(GlobalContext)
  const router = useRouter()
  const {user} = router.query
  const userTargetList = targetList.filter(item => item.user_name === user)

  const userInfo: ITarget = userTargetList[0]

  return (
    <div className='container my-8 mx-auto px-4 md:px-12 max-w-screen-xl'>
      <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
        <div className="sm:w-40 sm:h-40 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
        { userInfo?.avater_url ?
          <button className='rounded-full bg-gray-200 mx-auto'>
            <img alt="content" className="sm:w-40 sm:h-40 h-20 w-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 p-1" src={userInfo?.avater_url} />
          </button>
            : 
            <button className="rounded-full bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-40 sm:h-40 h-20 w-20 text-gray-500 p-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </button>
          }
        </div>
        <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
          <div className='flex'>
            <h2 className="text-gray-900 text-xl title-font font-medium py-2 px-4">{ userInfo?.user_name }</h2>
            { profile?.user_name == userInfo?.user_name && 
              <button className='ml-3 bg-transparent hover:bg-amber-300 text-amber-500 font-semibold hover:text-white py-1 px-2 border border-amber-500 hover:border-transparent rounded' onClick={() => router.push('/settings/profile')}>Edit Profile</button>
            }
          </div>
          <p>{userTargetList.length}Target</p>
          <p className="leading-relaxed text-base">user description</p>
          <div className='flex'>
            {/* <a className="mt-3 text-grey-darker hover:text-red-dark" href='#'> */}
              {/* @ts-ignore */}
              {/* <FontAwesomeIcon icon='fa-twitter' />
            </a> */}
            {/* <a className="mt-3 text-indigo-500 inline-flex items-center" href='#'> */}
              {/* @ts-ignore */}
              {/* <FontAwesomeIcon icon={faInstagram}  />
            </a>
            <a className="mt-3 text-indigo-500 inline-flex items-center" href='#'> */}
              {/* @ts-ignore */}
              {/* <FontAwesomeIcon icon={faLink}  />
            </a> */}
          </div>
        </div>
      </div>
      <div className='mt-16 border-gray-300 items-center'>
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          { userTargetList &&
            userTargetList.map((item, index) => (
                <Target target={item} key={index} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Main
