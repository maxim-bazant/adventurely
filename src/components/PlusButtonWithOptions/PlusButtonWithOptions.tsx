import { useState, useRef, useEffect } from "react";
import styles from "./PlusButtonWithOptions.module.scss";
import AddIcon from "@mui/icons-material/Add";
import TitleIcon from '@mui/icons-material/Title';
import NotesIcon from '@mui/icons-material/Notes';
import ImageIcon from '@mui/icons-material/Image';

interface PlusButtonWithOptionsProps {
  setChosenOption: (option: string) => void;
}

const PlusButtonWithOptions = ({ setChosenOption }: PlusButtonWithOptionsProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setChosenOption(option);
    setShowOptions(false);
  };

  const scrollToMakeVisible = () => {
    const optionsElement = optionsRef.current;
    if (optionsElement) {
      const rect = optionsElement.getBoundingClientRect();
      const isOutOfView = rect.bottom > window.innerHeight;

      if (isOutOfView) {
        optionsElement.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };

  useEffect(() => {
    if (showOptions) {
      scrollToMakeVisible();
    }
  }, [showOptions]);

  return (
    <div className={styles.container}>
      <div
        className={styles.plusButton}
        style={showOptions ? { transform: "rotate(45deg)" } : undefined}
        onClick={() => setShowOptions(!showOptions)}
      >
        <AddIcon fontSize="large" />
      </div>

      {showOptions && (
        <div className={styles.optionsBox} ref={optionsRef}>
          <div className={styles.option} onClick={() => handleOptionClick('Title')}>
            <TitleIcon className={styles.icon} />
            <p>Title</p>
          </div>

          <div className={styles.option} onClick={() => handleOptionClick('Text')}>
            <NotesIcon className={styles.icon} />
            <p>Text</p>
          </div>

          <div className={styles.option} onClick={() => handleOptionClick('Image')}>
            <ImageIcon className={styles.icon} />
            <p>Image</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlusButtonWithOptions;
