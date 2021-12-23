import { useState } from "react";
import { RowsName } from "../../Interfaces/EnumRows";
import "./Location.css";
interface Props {
  idLocation: string;
  movementData: string;
}
const Location = ({ idLocation, movementData }: Props) => {
  const [state, setstate] = useState<string>("");

  const showPosition = () => {
    const row = RowsName[parseInt(idLocation.split(" ")[0])];
    const col = parseInt(idLocation.split(" ")[1]);
    setstate(row + (col+1));
  };

  const hidePosition = () => {
    setstate("");
  };

  return (
    <div
      className={` location location-${movementData==="X"? 'destroyed': movementData ==="O" ? 'fail' : 'empty'} `}
      onMouseEnter={showPosition}
      onMouseLeave={hidePosition}
    >
      {movementData}
      {movementData ? "" : state}
    </div>
  );
};

export default Location;
