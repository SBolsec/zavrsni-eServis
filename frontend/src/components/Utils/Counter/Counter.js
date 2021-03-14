import CountUp from "react-countup";
import AppearSensor from "./AppearSensor";

const Counter = ({start, end}) => {
  if (!start) start = 0;
  if (!end) end = 1000;

  return (
    <AppearSensor>
      {({ hasBeenVisible }) =>
        hasBeenVisible
          ? <CountUp
            start={start}
            end={end}
            className="text-blueAccent"
            style={{ fontSize: '4rem' }} />
          : <span
            className="text-blueAccent"
            style={{ fontSize: '4rem' }}
          >{end}</span>
      }
    </AppearSensor>
  );
}
 
export default Counter;