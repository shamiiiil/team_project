import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeSwitch } from "./features/switcher/switcherSlice";

const Comp = () => {
  const counter = useSelector((state) => state.counter.value);
  const switcher = useSelector((state) => state.switcher.value);
  const dispatch = useDispatch();
  return (
    <div>
      Comp - {switcher ? counter : ""}
      <button onClick={() => dispatch(makeSwitch())}>show count</button>
    </div>
  );
};

export default Comp;
