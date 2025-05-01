import styles from "./EditButton.module.scss";
import EditIcon from '@mui/icons-material/Edit';


interface EditButtonProps {
    size?: number
    onClick: () => void;
}

const EditButton = ({ size, onClick }: EditButtonProps) => {
    return (
        <button onClick={onClick} className={styles.editButton} style={{ width: `${size}px`, height: `${size}px`}}><EditIcon sx={{ fontSize: (size ? size / 2 : 20) }} /></button>
    );
}

export default EditButton;