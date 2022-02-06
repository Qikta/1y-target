import { NextPage } from "next";
import ProfileForm from "../../components/ProfileForm";

const Profile: NextPage = () => {

  return (
    <div className="container justify-around mx-auto">
      <ProfileForm />
    </div>
  )
}

export default Profile