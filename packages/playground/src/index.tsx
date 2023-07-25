import * as React from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

import {
  INTERACTIVE_SLOT_COUNT_X,
  INTERACTIVE_SLOT_COUNT_Z,
  SLOT_DEPTH,
  SLOT_WIDTH,
  SPACE_BETWEEN_SLOTS,
} from "./constants";
import { Slot } from "./Slot";

const DEMO_SLOTS = [
  {
    x: (SLOT_WIDTH + SPACE_BETWEEN_SLOTS) * -2,
    z: 0,
    documentUrl: `${window.params.wsProtocol}:///examples/maze.html`,
    title: "Maze",
  }
];

function App() {
  const slotCoordinates: Array<[number, number]> = [];
  for (let x = 0; x < INTERACTIVE_SLOT_COUNT_X; x++) {
    for (let z = 0; z < INTERACTIVE_SLOT_COUNT_Z; z++) {
      if (!(x === 0 && z === 0)) {
        slotCoordinates.push([x, z]);
      }
    }
  }
  return (
    <>
      {DEMO_SLOTS.map((slot, index) => {
        return (
          <Slot
            key={"demo-" + index}
            x={slot.x}
            z={slot.z}
            demo={{ url: slot.documentUrl, title: slot.title }}
          />
        );
      })}
      {slotCoordinates.map(([x, z], index) => {
        return (
          <Slot
            key={index}
            x={(SLOT_WIDTH + SPACE_BETWEEN_SLOTS) * x}
            z={(SLOT_DEPTH + SPACE_BETWEEN_SLOTS) * z}
          />
        );
      })}
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById("root")!;
const root = createRoot(container);
flushSync(() => {
  root.render(<App />);
});
