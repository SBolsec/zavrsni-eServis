import React, { useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

/**
 * VisibilitySensor does not implement some kind of funcionality to track first time
 * visibility. This component extends VisibilitySensor compoment to provide this
 * feature. Just use `hasBeenVisible` render prop instead of `isVisible`.
 * 
 * https://github.com/joshwnj/react-visibility-sensor/issues/117#issuecomment-686365798
 */
const AppearSensor = ({
  onChange,
  children,
  ...rest
}) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);

  return (
    <VisibilitySensor {...rest} onChange={(isVisible) => {
      if (isVisible) setHasBeenVisible(true)
      if (onChange) onChange(isVisible)
    }}>
      {
        ({
          isVisible,
          ...restRenderProps
        }) => {
          return children({ isVisible, ...restRenderProps, hasBeenVisible })
        }
      }
    </VisibilitySensor>
  );
};

AppearSensor.propTypes = VisibilitySensor.propTypes
AppearSensor.defaultProps = VisibilitySensor.defaultProps

export default AppearSensor;