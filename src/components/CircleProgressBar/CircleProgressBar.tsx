import styles from "./CircleProgressBar.module.scss";

interface CircleProgressBarProps {
    number: number;
    totalNumber: number;
}


export const CircleProgressBar = ({ number, totalNumber }: CircleProgressBarProps) => {
    let share = Number((number / totalNumber).toFixed(2));

    return (
        <>
            <div className={styles.circleContainer}>
                <div className={styles.outer}>
                    <div className={styles.inner}>
                        <div id={styles.number}><p>{share * 100}% of countries visited</p></div>
                    </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="100%">
                    <circle cx="50%" cy="50%" r="45%" strokeLinecap="round" strokeDashoffset={2410 - 980 * share}/>
                </svg>
            </div>
        </>
    );
};

export default CircleProgressBar;