import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { Cell } from "../Cell";
import { CellState } from "../gameTypes";

it("should render cell in unknown state", () => {
  const { getByRole } = render(<Provider store={store}><Cell state={CellState.UNKNOWN} row={1} col={2} /></Provider>);
  const box = getByRole("GameFieldCell");
  expect(box.innerHTML).toEqual("");
});

it("should render cell in known state", () => {
  const { getByRole } = render(<Provider store={store}><Cell state={CellState.N1} row={1} col={2} /></Provider>);
  const box = getByRole("GameFieldCell");
  expect(box.children[0].innerHTML).toEqual("1");
});

it("should render cell marked as bomb", () => {
  const { getByRole } = render(<Provider store={store}><Cell state={CellState.MARKED} row={1} col={2} /></Provider>);
  const box = getByRole("GameFieldCell");
  expect(box.children[0].innerHTML).toEqual("flag_outlined");
});

it("should render cell marked as maybe bomb", () => {
  const { getByRole } = render(<Provider store={store}><Cell state={CellState.MAYBE} row={1} col={2} /></Provider>);
  const box = getByRole("GameFieldCell");
  expect(box.children[0].innerHTML).toEqual("?");
});
