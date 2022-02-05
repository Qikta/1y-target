import { useContext } from "react"
import { Context } from "./TargetList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from "next/router";
import Link from "next/link";

export default function Target () {
    const targetContext = useContext(Context)
    const router = useRouter()

    const targetStyle = !targetContext.is_complete ? 
      'overflow-hidden rounded-lg shadow-lg' : 'overflow-hidden rounded-lg shadow-lg outline outline-green-400'

  return (
    <div className="my-1 px-1 w-full sm:w-1/2 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <Link href={{ pathname: '/[username]/targets/[target_id]',
            query: { username: targetContext.user_name, target_id: targetContext.id }}} passHref>
        <article className={targetStyle}>
          { targetContext.ogp_url &&
            <img className="block h-auto w-full" src={targetContext.ogp_url} alt="ogpImage" />
          }
          <header className="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 className="text-lg">
                  <a className="no-underline hover:underline text-black" href="#">
                  { targetContext.name }
                  </a>
              </h1>
          </header>

          <div className="flex bg-gray-400 rounded-full md:w-auto mx-1">
              <div className="bg-green-500 text-xs font-medium text-white text-center leading-none rounded-full" style={{'width' : `${String(targetContext.value)}%`}}>
                  { targetContext.value }%
              </div>
          </div>

          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <div className="flex items-center no-underline hover:underline text-black">
              <Link href={{pathname: '/[username]', query: { username: targetContext.user_name }}} passHref>
                { targetContext.avater_url &&
                  <img className="w-10 h-10 rounded-full mr-4" src={targetContext.avater_url} alt="Avatar of Jonathan Reinink" />
                }
              </Link>
              <div className="text-sm">
                <Link href={{pathname: '/[username]', query: { username: targetContext.user_name }}} passHref>
                  <p className="text-gray-900 leading-none">{ targetContext.user_name }</p>
                </Link>
                <p className="text-gray-600">{ targetContext.created_date }</p>
              </div>
            </div>
            <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
              <span className="hidden">Like</span>
              <FontAwesomeIcon icon={faHeart} />
            </a>
          </footer>
        </article>
      </Link>
    </div>
  )
}