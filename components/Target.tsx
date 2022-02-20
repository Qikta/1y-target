import { useContext, useState } from "react"
import { Context } from "./TargetList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from "next/router";
import Link from "next/link";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { GlobalContext } from "../context/global-state-provider";
import { supabase } from "../utils/supabaseClient";

export default function Target (props: any) {
  // const targetContext = useContext(Context)
  const router = useRouter()
  const {targetList, profile, user, favoriteList} = useContext(GlobalContext)
  const [loading, setLoading] = useState(false);

  // const target_favorite_list = favoriteList.filter(item => item.target_id === props.target.id)

  const insertLike = async () => {
    if (user) {
      try {
        setLoading(true);
        const requestData = {
          user_id: user.id,
          target_id: props.target.id
        }
        const { error } = await supabase.from('likes').insert(requestData)

        if (error) { throw error}

        location.reload()
      } catch(err) {
        alert(err)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="my-1 px-1 w-full sm:w-1/2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <Link href={{ pathname: '/[user]/targets/[target_id]',
            query: { user: props.target.user_name, target_id: props.target.id }}} passHref>
        <article className='overflow-hidden rounded-lg shadow-md hover:shadow-lg'>
          { props.target.ogp_url &&
            <img className="block h-auto w-full" src={props.target.ogp_url} alt="ogpImage" />
          }
          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                  <a className="no-underline hover:underline text-black" href="#">
                  { props.target.title }
                  </a>
              </h1>
          </header>

          <div className="flex bg-gray-400 rounded-full md:w-auto mx-1">
              <div className="bg-green-500 text-xs font-medium text-white text-center leading-none rounded-full" style={{'width' : `${String(props.target.value)}%`}}>
                  { props.target.value }%
              </div>
          </div>

          <footer className="flex justify-between leading-none p-2 md:p-4">
            <div className="flex items-center no-underline hover:underline text-black">
              <Link href={{pathname: '/[user]', query: { user: props.target.user_name }}} passHref>
                { props.target.avater_url ?
                  <img className="w-10 h-10 rounded-full mr-4" src={props.target.avater_url} alt="Avatar of Jonathan Reinink" />
                  :
                  <button className="rounded-full bg-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-500 m-2"
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
              </Link>
              <div className="text-sm">
                <Link href={{pathname: '/[user]', query: { user: props.target.user_name }}} passHref>
                  <p className="text-gray-900 leading-none">{ props.target.user_name }</p>
                </Link>
                <p className="text-gray-600">{ props.target.created_date }</p>
              </div>
            </div>
            <div className="flex justify-end items-center">
              <button className="w-4 h-4 no-underline text-grey-darker hover:text-red-dark" onClick={insertLike}>
                {/* @ts-ignore */}
                {/* <FontAwesomeIcon icon={faHeartSolid} /> */}
                <FontAwesomeIcon icon={faHeartRegular} />
              </button>
              <p className="pl-1">{props.target.favorite_count}</p>
            </div>
          </footer>
        </article>
      </Link>
    </div>
  )
}