import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PublicIconProps {
    size?: number
    isPublic: boolean;
}

const PublicIcon = ({ size, isPublic }: PublicIconProps) => {
    return (
        (isPublic ? <VisibilityIcon sx={{ fontSize: (size ? size / 2 : 20) }}/> : <VisibilityOffIcon sx={{ fontSize: (size ? size / 2 : 20) }}/>)
    );
}

export default PublicIcon;