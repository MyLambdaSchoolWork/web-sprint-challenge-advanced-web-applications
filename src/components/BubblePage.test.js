import React from "react";
import { render, screen } from "@testing-library/react";
import BubblePage from "./BubblePage";

test("Renders BubblePage without errors", () => {
  render(<BubblePage auth={{headers: {authorization: 'ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98'}}}/>)
});

test("Fetches data and renders the bubbles on mounting", async () => {
  render(<BubblePage auth={{headers: {authorization: 'ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98'}}}/>)

  const colors = await screen.findAllByTestId('color')
  expect(colors.length).toBeGreaterThan(0)
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading