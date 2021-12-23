import { useState } from "react";

import "./InputCommands.css";

interface Props {
  executeCommandsAttack: (commandsAttack: string) => void;
}

const InputCommands = ({ executeCommandsAttack }: Props) => {
  const [commandsAttack, setCommandsAttack] = useState<string>("");
  const handledSubmit = (e: any) => {
    e.preventDefault();
    console.log(commandsAttack.length)
    if(commandsAttack.length > 1) executeCommandsAttack(commandsAttack);
    setCommandsAttack("")
  };
  return (
    <div className="container-actions-form">
      <form onSubmit={handledSubmit}>
        <input
        style={{textTransform:"uppercase"}}
          type="text"
          placeholder="Ingresa la posicion de ataque"
          value={commandsAttack}
          onChange={(e) => setCommandsAttack(e.target.value)}
        />

        <button className="button-game"><span>Ejecutar
        </span>
        </button>
      </form>
    </div>
  );
};

export default InputCommands;
