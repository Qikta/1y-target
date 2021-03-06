import useModal from "../hooks/useModal"
import useUser from "../hooks/useUser";

export default function Auth (props: any) {
  const { signInWithGoogle, signInWithGithub  } = useUser();

  return (
    <div className="">
      <div className="bg-white rounded-t-lg p-8">
        <div className="flex justify-end p-2">
          <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            onClick={props.onClick}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
        <div className="flex justify-end p-2">
          <p className="text-center text-sm text-gray-500 font-light">
            OYT is a platform for sharing your goals for the year.<br /> 
            Decide what goals you want to achieve and share them with others.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <button
              onClick={() => signInWithGoogle() }
              className="
                  flex
                  items-center
                  py-2
                  px-4
                  text-sm
                  uppercase
                  rounded
                  bg-white
                  hover:bg-gray-100
                  text-indigo-500
                  border border-transparent
                  hover:border-transparent hover:text-gray-700
                  shadow-md
                  hover:shadow-lg
                  font-medium
                  transition
                  transform
                  hover:-translate-y-0.5
                "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mr-3"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#fbc02d"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                />
                <path
                  fill="#e53935"
                  d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                />
                <path
                  fill="#4caf50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                />
                <path
                  fill="#1565c0"
                  d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                />
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 rounded-b-lg py-12 px-4 lg:px-24">
        <p className="text-center text-sm text-gray-500 font-light">
          Please Login after agreeing to the
          <a href="terms" className="underline hover:text-amber-400"> Terms </a>and
          <a href="privacy" className="underline hover:text-amber-400"> Privacy Policy</a>.
        </p>
      </div>
    </div>
  )
}