import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import image from "../../assets/landing.png";
import image_cutout from "../../assets/landing_cutout.png";
import styles from "./LandingPage.module.scss"
import Logo from "../../components/Logo/Logo";


const LandingPage = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  // Redirect to /dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");

    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <div>You are logged in. Redirecting...</div>;
  }

  return ( 
    <div className={styles.landingContainer} style={{ height: `${window.innerHeight}px` }}>
      <div className={styles.left}>
        <Logo />
        <div className={styles.textContainer}>
          <div className={styles.mobileLogo}>
            <img src={logo} alt="logo" />
          </div>

          <h1>Adventurely</h1>
          <p>Plan, Travel, Share</p>
          <div className={styles.landingButtons}>
            <button onClick={() => loginWithRedirect()}>Log In</button>
            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
            >
              Sign up
            </button>
          </div>

        </div>
      </div>

      <div className={styles.right}>
        <img className={styles.cutout} src={image_cutout} />
        <img className={styles.image} src={image} alt="image" />
      </div>
    </div>
  );
};

export default LandingPage;
