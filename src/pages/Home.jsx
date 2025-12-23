import "../App.css";
import logo from "../assets/logo.png";
import { loginWithSpotify } from "../api/backend";
function App() {
  return (
    <div className="container">
      <div className="logo"><img src={logo} alt="Roastify logo" /></div>

      <h1 className="title animate-title">
  Spotify <span className="highlight">Roaster</span>
</h1>

      <p className="subtitle animate-subtitle">
  Think your music taste is elite?
  <br />
  Let our AI judge your listening habits.
</p>


      <button className="login-btn" onClick={loginWithSpotify}>
       ♫ Login with Spotify
      </button>

      <p className="footer">
        We don’t save your data. We just roast you.
      </p>
    </div>
  );
}

export default App;
