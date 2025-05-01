import styles from "./DeleteButton.module.scss";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteButtonProps {
    size?: number;
    onClick: () => void;
}

const DeleteButton = ({ size, onClick }: DeleteButtonProps) => {
    return (
        <button type="button" onClick={onClick} className={styles.deleteButton} style={{ width: `${size}px`, height: `${size}px`}}><DeleteIcon sx={{ fontSize: (size ? size / 2 : 20) }}/></button>
    );
}

export default DeleteButton;