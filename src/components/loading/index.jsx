import styles from "./loading.module.css";
import { PacmanLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <PacmanLoader color="#3F0112" size={24} />
    </div>
  );
};

export default Loading;
