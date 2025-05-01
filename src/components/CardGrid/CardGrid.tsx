import styles from "./CardGrid.module.scss"

interface CardGridProps {
    children: React.ReactNode;
}

const CardGrid = ({ children }: CardGridProps) => {
    return (
        <div className={styles.cardGrid}>
            {children}
        </div>
    );
}

export default CardGrid;