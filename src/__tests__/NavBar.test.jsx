import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

const renderNavBar = (initialRoute = "/") =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <NavBar />
    </MemoryRouter>
  );

test('wraps content in a div with "navbar" class', () => {
  const { container } = renderNavBar();
  expect(container.querySelector(".navbar")).toBeInTheDocument();
});

test("renders a Home <NavLink> and activates it on click", () => {
  renderNavBar();
  const link = screen.getByText("Home");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.href).toContain("/");
  fireEvent.click(link);
  expect(link).toHaveAttribute("aria-current", "page");
});

test("renders an Actors <NavLink> and activates it on click", () => {
  renderNavBar("/actors");
  const link = screen.getByText("Actors");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.href).toContain("/actors");
  fireEvent.click(link);
  expect(link).toHaveAttribute("aria-current", "page");
});

test("renders a Directors <NavLink> and activates it on click", () => {
  renderNavBar("/directors");
  const link = screen.getByText("Directors");
  expect(link).toBeInTheDocument();
  expect(link.tagName).toBe("A");
  expect(link.href).toContain("/directors");
  fireEvent.click(link);
  expect(link).toHaveAttribute("aria-current", "page");
});
