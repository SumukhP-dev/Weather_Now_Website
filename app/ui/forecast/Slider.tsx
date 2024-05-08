import * as React from "react";
import { Range } from "react-range";
import { useStore } from "../../lib/store";

export default class Slider extends React.Component {
  state = { values: [24] };
  render() {
    return (
      <>
        <div className="p-10 flex justify-center w-full">
          <Range
            step={1}
            min={1}
            max={24}
            values={this.state.values}
            onChange={(values) => {
              useStore.setState({ position: values });
              this.setState({ values });
            }}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "90%",
                  backgroundColor: "#ccc",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <>
                <div
                  {...props}
                  style={{
                    ...props.style,
                    height: "42px",
                    width: "42px",
                    backgroundColor: "#999",
                  }}
                />
              </>
            )}
          />
        </div>
      </>
    );
  }
}
