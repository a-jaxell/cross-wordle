import { FC, useState } from "react";
import styles from "./style.module.scss";

type SubmitHigScoreProps = {
  onSubmit: (name: string) => void;
};

const SubmitHighscore: FC<SubmitHigScoreProps> = ({ onSubmit }) => {
  const [name, setName] = useState<string>("");
  return (
    <form
      className={styles.formContainer}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name);
      }}
    >
      <h4>Congratulations!</h4>
      <p>Whats your name? </p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input className={styles.submitButton} type="submit" />
    </form>
  );
};
export default SubmitHighscore;
