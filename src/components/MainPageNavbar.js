import { faSignIn, faUser, faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../components/animations/LifeAnimation.css';
import { supabase } from "../utils/SupabaseClient";
import { Context } from "./GameContext";
import ThemeToggle from "./ThemeToggle";

function MainPageNavbar() {

  const navigate = useNavigate()
  const location = useLocation()
  const [ user, setUser ] = useState(null)
  const [ open, setOpen ] = useState(false)
  const { mute, setMute } = useContext(Context)

  const toggleSound = () => {
    setMute(oldValue => !oldValue);
  }

  const login = () => {
    navigate("/login");
  }

  const support = () => {
    navigate("/support");
  }


  const dropdown = () => {
    setOpen(oldValue => !oldValue);
  }

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null)
    navigate("/");
  }

  const getProfile = async () => {
    const profile = await supabase.auth.getUser();
    if (profile.data.user) {
      setUser(profile.data.user);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <nav className="theme-surface">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex flex-shrink-0 items-center">
              {location.pathname !== "/" && (
                <Link to="/" aria-label="Torna alla home"
                  className="flex-shrink-0 rounded-full bg-gray-700 p-3 text-base text-white shadow-lg transition-colors duration-200 hover:bg-gray-600">
                  <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </Link>
              )}
            </div>
            <div className="hidden sm:ml-6 sm:block">
            </div>
          </div>
          <div className="flex items-center sm:ml-6">
            <div className="flex items-center gap-4">
              {!user && (
                <button type="button" onClick={login} className="nav-action" aria-label="Accedi">
                  <FontAwesomeIcon icon={faSignIn} aria-hidden="true" />
                </button>
              )}
              <button type="button" onClick={toggleSound} className="nav-action"
                aria-label={mute ? "Attiva audio" : "Disattiva audio"}>
                <FontAwesomeIcon icon={mute ? faVolumeXmark : faVolumeHigh} aria-hidden="true" />
              </button>
              {location.pathname === "/" && <ThemeToggle />}
              {user ?
                <div>
                  <div className="relative inline-block text-left">
                    <div>
                      <button type="button" className="nav-action" id="menu-button" aria-label="Menu account" aria-expanded={open} aria-haspopup="true" onClick={dropdown}>
                        <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical"
                      aria-labelledby="menu-button" tabIndex="-1" style={{ 'display': open ? 'block' : 'none' }}>
                      <div className="py-1" role="none">
                        <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0" onClick={() => setOpen(false)}>Profile</Link>
                        <button type="button" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1" onClick={support}>Support</button>
                        <button type="submit" className="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-3" onClick={logout}>Log out</button>
                      </div>
                    </div>
                  </div>
                </div>
                : <span></span>}
            </div>
          </div>
        </div>
      </div>
    </nav>

  )
}

export default MainPageNavbar;