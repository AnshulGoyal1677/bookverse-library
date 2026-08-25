import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("bookverse_session");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <div className="container profile-page">
      <div className="profile-card">
        <h1>My Profile</h1>
        <p className="profile-field">
          <strong>Name:</strong> {currentUser.name}
        </p>
        <p className="profile-field">
          <strong>Email:</strong> {currentUser.email}
        </p>

        <button className="btn btn-outline" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
