import NavBar from "@/components/NavBar"
import { ProfileComponent } from "@/components/user/ProfileComponent"


const UserProfile = () => {
  return (
    <div>
      <NavBar pathname="/users/profile"/>
      <ProfileComponent/>
    </div>
  )
}
//TODO->main is resume upload after register so on login sending the user a notification to go to profile and upload for better and also when applying if no resume then also a note or notification for the user shd be given

export default UserProfile
