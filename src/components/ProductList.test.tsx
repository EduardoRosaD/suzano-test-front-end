'use client';
import { render } from "@testing-library/react";
import ProductList from "./ProductList";
import React from "react"; 


describe("ProductList Snapshot Test", () => {
  it("should match the snapshot", () => {
    const { asFragment } = render(<ProductList />);
    expect(asFragment()).toMatchSnapshot();
  });
});
