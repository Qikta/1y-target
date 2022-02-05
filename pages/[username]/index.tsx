import { GetStaticPaths, GetStaticProps } from 'next'
import Target from '../../components/Target'
import { Context } from '../../components/TargetList'
import { ITarget } from '../../hooks/useTarget'
import useUser from '../../hooks/useUser'
import { definitions } from '../../types/entities/supabase'
import { supabase } from '../../utils/supabaseClient'
interface PathParams {
  username: string
}

type PageProps = {
  id: string
  name: string
  user_name: string
  description: string
  value: number
  is_complete: boolean
  favorite_count: number
  avater_url: string
  created_date: string
  ogp_url: string
}


// export const getStaticPaths = async () => {
//   try {
//     const {data, error} = await supabase.from<definitions['target_view']>('target_view').select('*') 
//     if (error) {
//       throw error
//     }

//     if (data) {
//       const paths = data.map((post) => ({
//         params: {
//           username: String(post.username)
//         },
//       }))
//       return { paths, fallback: false }
//     }
//   } catch (err) {
//     alert (err)
//   }
// }

// @ts-ignore
export const getServerSideProps = async ({ params }) => { 
  // ${path.id}とすることで引数pathのidごとのデータを取得する 
  const {data, error} = await supabase
    .from<definitions['target_view']>('target_view')
    .select('*')
    .eq('username', String(params.username))
  
  if (error) { throw error }
  const post = JSON.stringify(data)

  // props: {}の形で返却する
  return {
    props: {
      post
    },
  }
}

// @ts-ignore
const Main = ({post}) => {
  const seriarisePost = JSON.parse(post)
  const targetList: Array<ITarget> = []

  if(seriarisePost) {
    for (const target of seriarisePost) {
      const optionalCreateTiem = target.created_at !== undefined ? new Date(target.created_at) : undefined

      targetList.push({
        id: String(target.id),
        name: target?.name || '',
        user_name: target.username || '',
        description: target.description || '',
        value: target.value || 0,
        is_complete: target.is_complete || false,
        favorite_count: target.favorite_count || 0,
        avater_url: target.avatar_url || '',
        created_date: optionalCreateTiem?.toLocaleDateString() || '',
        ogp_url: target.ogp_url
      })
    }
  }
  const userInfo: ITarget = targetList[0]

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
          <p>{targetList.length}Target</p>
        </div>
      </div>
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {
          targetList.map((target, index) => (
            <Context.Provider value={target} key={index} >
              <Target />
            </Context.Provider>
          ))
        }
      </div>
    </div>
  )
}

export default Main
