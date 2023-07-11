import { useEffect, useState } from "react";
import { CheckpointTable } from "../components/CheckpointTable";

export const CheckpointPage = () => {
  const [points, setPoints] = useState([]);

  const getAllPoints = async () => {
    const response = await fetch('/point');
    const body = await response.json();
    setPoints(body.data);
  }

  const clear = async () => {
    const response = await fetch('/point', {method: 'DELETE'});
    const body = await response.json();
    if (body.code !== 200)
      alert('Clear Points Failed: ' + body.code + ' ' + body.msg);
    getAllPoints();
  }

  useEffect(() => {getAllPoints();}, []);

  return (
    <>
      <a href='/'>
        <button>Homepage</button>
      </a>
      <button onClick={clear}>
        Clear All Points
      </button>
      <CheckpointTable canMod points={points} onChange={getAllPoints} />
    </>
  );
}