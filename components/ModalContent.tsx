import useModal from "../hooks/useModal";
import useUser from "../hooks/useUser";
import { supabase } from "../utils/supabaseClient";
import Auth from "./Auth";
import TargetForm from "./TargetForm";


export default function ModalContent (props: any) {
  const session = supabase.auth.session()
  return (
      <div>
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
            { !session ? <Auth onClick={props.onClick} /> : <TargetForm onClick={props.onClick} />}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black" /> :
      </div>
  )
}
