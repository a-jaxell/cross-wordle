import { FC, useState } from "react";

type SubmitHigScoreProps = {
    onSubmit: (name: string) => void;
}


const SubmitHighscore: FC<SubmitHigScoreProps> = ({onSubmit}) => {
    const [name, setName] = useState<string>('')
    return(
       <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(name);
       }}>
            <h4>Congratulations!</h4>
            <p>Whats your name? </p>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="submit" />            
       </form> 
    )
}
export default SubmitHighscore;