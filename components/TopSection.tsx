import Image from 'next/image'
import { useRouter } from 'next/router'
import headerPNG from '../public/header.png'
export const TopSection = (props: any) => {
  const router = useRouter()
  return (
    <div className="py-12 bg-gray-100 md:py-24">
      <div className="grid max-w-screen-xl px-6 mx-auto lg:px-8 xl:px-4 md:grid-cols-4 xl:grid-cols-5 gap-x-12 lg:gap-x-20">
        <div className="self-center order-2 col-span-2 mt-12 md:order-1 md:mt-0">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl md:mb-4 lg:mb-8">One Year Target</h1>
          <p className="mb-6 text-lg text-gray-600 xl:text-xl lg:mb-8 xl:mb-10">
            OneYearTarget is a service to share your own goals for the year. You can easily share what you want to do and what you want to achieve in a year through social networking services such as twitter. What are your goals for the year?
          </p>
          <div className="flex mb-6 space-x-4">
              <button
                className="
                  inline-block 
                  px-5 
                  py-2 
                  font-semibold
                  rounded-lg 
                  focus:outline-none
                  hover:bg-gray-300
                  to-indigo-700
                  hover:to-indigo-700"
                onClick={props.onClick}
              >
                Get started
              </button>
              <button
                onClick={() => router.push('about')}
                className="
                  inline-block
                  px-5
                  py-2
                  font-semibold
                  text-white
                  rounded-lg
                  focus:outline-none
                  bg-amber-400
                  hover:bg-gray-300"
              >
                About Hear
              </button>
          </div>
          <p className="text-sm text-gray-500">No credit card required. Cancel anytime.</p>
        </div>
        <div className="order-1 col-span-2 md:order-2 xl:col-span-3">
          <Image src={headerPNG} className="rounded-lg shadow-2xl" alt="" />
        </div>
      </div>
    </div>
  )
} 