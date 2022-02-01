import { GetStaticPaths, GetStaticProps } from 'next'
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


export const getStaticPaths = async () => {
  try {
    const {data, error} = await supabase.from<definitions['target_view']>('target_view').select('*') 
    if (error) {
      throw error
    }

    if (data) {
      const paths = data.map((post) => ({
        params: {
          username: String(post.username)
        },
      }))
      return { paths, fallback: false }
    }
  } catch (err) {
    alert (err)
  }
}

// @ts-ignore
export const getStaticProps = async ({ params }) => { 
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
  return (
    <div>
      <h2>dadffd</h2>
    </div>
  )
}

export default Main
