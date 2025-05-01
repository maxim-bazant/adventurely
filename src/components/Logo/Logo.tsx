import styles from "./Logo.module.scss"
import logo from "../../assets/logo.png";

const Logo = () => {
    return(
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
          <p>Adventurely</p>
        </div>
    )
}

export default Logo;