import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ITarget } from "../../../../hooks/useTarget";
import { definitions } from "../../../../types/entities/supabase";
import { supabase } from "../../../../utils/supabaseClient";

interface PathParams {
  id: string
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
          username: String(post.username),
          target_id: String(post.id)
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
    .eq('id', Number(params.target_id))
    .single()
  
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
const Main = ({ post }) => {
  const seriarisePost = JSON.parse(post)

  const optionalCreateTiem = seriarisePost.created_at !== undefined ? new Date(seriarisePost.created_at) : undefined

  const target: ITarget = {
    id: String(seriarisePost.id),
    name: seriarisePost?.name || '',
    user_name: seriarisePost.username || '',
    description: seriarisePost.description || '',
    value: seriarisePost.value || 0,
    is_complete: seriarisePost.is_complete || false,
    favorite_count: seriarisePost.favorite_count || 0,
    avater_url: seriarisePost.avatar_url || '',
    created_date: optionalCreateTiem?.toLocaleDateString() || '',
    ogp_url: seriarisePost.ogp_url
  }
  
  
  return (
    <div className="container px-5 py-24 mx-auto flex flex-col">
      <div className="lg:w-4/6 mx-auto">
        <div className="overflow-hidden">
          { target.ogp_url &&
            <img alt="content" className="object-cover object-center h-full w-full" src={target.ogp_url} />
          }
        </div>
        <div className="flex flex-col sm:flex-row mt-10">
          <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
              {/* <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeinejoin="round" stroke-width="2" className="w-10 h-10" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg> */}
            </div>
            <div className="flex flex-col items-center text-center justify-center">
              <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Phoebe Caulfield</h2>
              <div className="w-12 h-1 bg-indigo-500 rounded mt-2 mb-4"></div>
              <p className="text-base">Raclette knausgaard hella meggs normcore williamsburg enamel pin sartorial venmo tbh hot chicken gentrify portland.</p>
            </div>
          </div>
          <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
            <p className="leading-relaxed text-lg mb-4">
              Meggings portland fingerstache lyft, post-ironic fixie man bun banh mi umami everyday carry hexagon locavore direct trade art party. Locavore small batch listicle gastropub farm-to-table lumbersexual salvia messenger bag. Coloring book flannel truffaut craft beer drinking vinegar sartorial, disrupt fashion axe normcore meh butcher. Portland 90s scenester vexillologist forage post-ironic asymmetrical, chartreuse disrupt butcher paleo intelligentsia pabst before they sold out four loko. 3 wolf moon brooklyn.
            </p>
            <a className="text-indigo-500 inline-flex items-center">Learn More
              {/* <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg> */}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
