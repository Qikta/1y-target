import { useContext } from "react"
import { Context } from "./TargetList"


export default function Target () {
    const targetContext = useContext(Context)

  return (
    <article className="overflow-hidden rounded-lg shadow-lg">
        {/* <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random" /> */}
        {/* <a href="#">
        <img alt="Placeholder" className="block h-auto w-full" src="https://picsum.photos/600/400/?random"> -->
        </a>
        <div className="py-4">
        <span className="mx-auto">
            <Emoji :emoji="{ id: 'santa', skin: 3 }" :size="20" className="emoji-image" />
        </span>
        </div> */}

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 className="text-lg">
                <a className="no-underline hover:underline text-black" href="#">
                { targetContext.name }
                </a>
            </h1>
            <p className="text-grey-darker text-sm">
                { targetContext.created_date }
            </p>
        </header>

        {/* <!-- <div className="w-full h-4 md:w-auto bg-gray-400 rounded-full mt-3">
            <div className="w-3/10 h-full text-center text-xs text-white bg-green-500 rounded-full">
            {{ target.value }}%
            </div>
        </div> --> */}

        {/* <div className="w-full bg-gray-400 rounded-full md:w-auto mx-1">
            <div className="bg-green-500 text-xs font-medium text-white text-center leading-none rounded-full" :style="progressBarStyle">
                {{ target.value }}%
            </div>
        </div> */}

        <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <a className="flex items-center no-underline hover:underline text-black" href="#">
                <p className="ml-2 text-sm">
                { targetContext.user_name }
                </p>
            </a>
            {/* <a className="no-underline text-grey-darker hover:text-red-dark" href="#">
                <span className="hidden">Like</span>
                <font-awesome-icon icon="heart" />
            </a> */}
        </footer>
    </article>
  )
}