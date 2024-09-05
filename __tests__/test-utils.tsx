import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/Redux/store";

interface CustomRenderOptions extends RenderOptions {
  initialState?: any;
}

const customRender = (
  ui: React.ReactElement,
  { initialState, ...renderOptions }: CustomRenderOptions = {}
) => {
  return render(<Provider store={store}>{ui}</Provider>, renderOptions);
};

export * from "@testing-library/react";
export { customRender as render };
