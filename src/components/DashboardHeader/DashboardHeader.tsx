import styles from './DashboardHeader.module.scss';


interface DashboardHeaderProps {
    title: string;
    button?: {
        title: string;
        onClick: () => void;
    }
}

const DashboardHeader = ({ title, button }: DashboardHeaderProps) => {
    return (
        <div className={styles.header}>
            <h1>{ title }</h1>
            {button && (
                <button onClick={() => button.onClick()}>{button.title}</button>
            )}
        </div>
    );
}

export default DashboardHeader;