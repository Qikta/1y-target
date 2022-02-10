import { GetStaticPaths, GetStaticProps } from 'next'
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
    <div className='container my-8 mx-auto px-4 md:px-12'>
      <div className='flex justify-center mx-auto'>
        { userInfo.avater_url &&
          <img alt="content" className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400" src={userInfo.avater_url} />
        }
        <div className="flex flex-col items-center text-center justify-center">
          <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{ userInfo.user_name }</h2>
          <div className="w-12 h-1 bg-amber-400 rounded mt-2 mb-4"></div>
          <p className="text-base">user description</p>
          <p>{userTargetList.length}Target</p>
        </div>
        { profile?.user_name == userInfo.user_name && 
        <div className="flex flex-col items-center text-center justify-end ">
          <button onClick={() => router.push('/settings/profile')}>edit</button>
        </div>
        }
      </div>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        { userTargetList &&
          userTargetList.map((item, index) => (
              <Target target={item} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default Main
