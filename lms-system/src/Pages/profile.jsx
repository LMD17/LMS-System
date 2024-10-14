import { useContext } from "react"
import { UserItem } from "../Components"
import { UserContext } from "../Contexts/UserContext"
import './CSS/ListPages.css'

const Profile = () => {
  const { verifiedUser } = useContext(UserContext)  // get logged in user details

  return (
    <div>
      <div className="item-row">
          {verifiedUser ? (
              verifiedUser.id ? (
                <div key={verifiedUser.id} className="item-column-4 item-column-s-6">
                  <UserItem user={verifiedUser} />
                </div>
              ): null
            ) : (<h1>Error fetching account</h1>)
          }
      </div>
    </div>
  )
}

export default Profile
