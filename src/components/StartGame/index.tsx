import styles from "./style.module.scss";
import { useState } from "react";

//Set any for now, change to gameObject later
export default function StartGame({ setGameData }: any) {
  const [isChecked, setIsChecked] = useState(false);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };
  async function handleSubmit() {
    // Send request with a req body of { "length": "5" , "uniqueChars": "true"}
    // response will be { id: "id-string"}
    try {
      const res = await fetch("/api/game");
      const data = await res.json();

      setGameData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={styles.formContainer}>
      <div>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={isChecked}
          name="uniqueCharacters"
          onChange={handleOnChange}
        />
        Unique characters
      </div>
      <div>
        <select name="selectLetters">
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        Letters
      </div>
      <button className={styles.submitButton} onClick={handleSubmit}>
        Start Game
      </button>
    </form>
  );
}
// Submit fetches game data from database and sets state for app.
