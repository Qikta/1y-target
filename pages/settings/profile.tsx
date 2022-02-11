import { NextPage } from "next";
import ProfileForm from "../../components/ProfileForm";

const Profile: NextPage = () => {

  return (
    <div className="container justify-around mx-auto p-10">
      <ProfileForm mode='EDIT' />
    </div>
  )
}

export default Profile