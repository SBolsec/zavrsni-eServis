import CountUp from "react-countup";
import AppearSensor from "./AppearSensor";

const Counter = ({start, end, style}) => {
  if (!start) start = 0;
  if (!end) end = 0;
  if (!style) style = { fontSize: '4rem' };

  return (
    <AppearSensor>
      {({ hasBeenVisible }) =>
        hasBeenVisible
          ? <CountUp
            start={start}
            end={end}
            className="text-blueAccent"
            style={style} />
          : <span
            className="text-blueAccent"
            style={style}
          >{end}</span>
      }
    </AppearSensor>
  );
}
 
export default Counter;