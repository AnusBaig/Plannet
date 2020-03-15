import React, { useState, useCallback, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import { SLIDER_MAX_VALUE } from "src/constants";
import { colors } from "src/shared/styles/colors";
import {
  SliderRangeStyled,
  ThumbStyled,
  TrackWrapperStyled,
  TrackStyled,
  ThumbWrapperStyled,
  ValuesStyled,
  ValueStyled
} from "./SliderRange.styled";

const STEP = 10;
const MIN = 0;
const MAX = SLIDER_MAX_VALUE;

interface SliderRangeProps {
  values: number;
  handleChange: (values: number[], setValues: React.Dispatch<number>) => void;
}

const SliderRange: React.FC<SliderRangeProps> = ({
  values: initialValues,
  handleChange
}) => {
  const [values, setValues] = useState(initialValues);

  const handleChange1 = useCallback(
    values => {
      handleChange(values[0], setValues);
    },
    [handleChange]
  );
  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  return (
    <SliderRangeStyled>
      {/* <ValuesStyled>
        <ValueStyled>$ {values.toFixed(0)}</ValueStyled>
      </ValuesStyled> */}
      <Range
        values={[values]}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={handleChange1}
        renderTrack={({ props, children }) => (
          <TrackWrapperStyled
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{ ...props.style }}
          >
            <div className="helpline2">
              <span className="text">530</span>
              <span className="text">2780</span>
              <span className="text">5000</span>
              <span className="text">7250</span>
              <span className="text">9500</span>
            </div>
            <div className="helpline">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <TrackStyled
              ref={props.ref}
              style={{
                background: getTrackBackground({
                  values: [values],
                  colors: [
                    colors.paleSkyBlue,
                    colors.cerulean,
                    colors.paleSkyBlue
                  ],
                  min: MIN,
                  max: MAX
                })
              }}
            >
              {children}
            </TrackStyled>
          </TrackWrapperStyled>
        )}
        renderThumb={({ props, isDragged }) => (
          <ThumbWrapperStyled {...props} style={{ ...props.style }}>
            <ThumbStyled isDragged={isDragged} />
          </ThumbWrapperStyled>
        )}
      />
    </SliderRangeStyled>
  );
};

export default SliderRange;
