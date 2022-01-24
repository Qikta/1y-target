import { useContext } from "react"
import { Context } from "./TargetList"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Target () {
    const targetContext = useContext(Context)

  return (
    <article className="overflow-hidden rounded-lg shadow-lg">
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

        <div className="w-full bg-gray-400 rounded-full md:w-auto mx-1">
            <div className="bg-green-500 text-xs font-medium text-white text-center leading-none rounded-full" style={{'width' : `${String(targetContext.value)}%`}}>
                { targetContext.value }%
            </div>
        </div>

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <a className="flex items-center no-underline hover:underline text-black" href="#">
                { targetContext.avater_url &&
                  <img className="w-10 h-10 rounded-full mr-4" src={targetContext.avater_url} alt="Avatar of Jonathan Reinink" />
                 }
                <div className="text-sm">
                    <p className="text-gray-900 leading-none">{ targetContext.user_name }</p>
                    <p className="text-gray-600">{ targetContext.created_date }</p>
                </div>
            </a>
            <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                <span className="hidden">Like</span>
                <FontAwesomeIcon icon={faHeart} />
            </a>
        </footer>
    </article>
  )
}