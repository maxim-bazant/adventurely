import styles from './DashboardHeader.module.scss';


interface DashboardHeaderProps {
    title: string;
    button?: {
        title: string;
        onClick: () => void;
        hideOnMobile?: boolean;
    }
}

const DashboardHeader = ({ title, button }: DashboardHeaderProps) => {
    return (
        <div className={styles.header}>
            <h1>{ title }</h1>
            {button && (
                <button className={button.hideOnMobile ? "hideOnMobile": ""} onClick={() => button.onClick()}>{button.title}</button>
            )}
        </div>
    );
}

export default DashboardHeader;