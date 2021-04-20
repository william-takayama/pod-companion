import { useEffect, useState } from "react";
import classes from "./test.module.scss";

export default function Home(): JSX.Element {
  const [time, setTime] = useState(Date());

  useEffect(() => {
    setTimeout(() => {
      setTime(Date());
    }, 1000);
  }, [time]);

  return (
    <div className={classes.container}>
      <h1>Hello World {time}</h1>
    </div>
  );
}
