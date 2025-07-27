import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routeObjects } from "../routes";

const createRouter = () =>
  createMemoryRouter(routeObjects, {
    initialEntries: ["/"],
  });

test("renders 'Home Page' inside of an <h1 />", async () => {
  render(<RouterProvider router={createRouter()} />);
  const h1 = await screen.findByRole("heading", { level: 1 });
  expect(h1).toHaveTextContent("Home Page");
});

test("Displays a list of movie titles", async () => {
  render(<RouterProvider router={createRouter()} />);
  const titleList = await screen.findAllByRole("heading", { level: 2 });
  expect(titleList.length).toBeGreaterThan(2);
  expect(titleList[0].tagName).toBe("H2");
  expect(titleList[0].textContent).toBe("Doctor Strange");
});

test("Displays links for each associated movie", async () => {
  render(<RouterProvider router={createRouter()} />);
  const linkList = await screen.findAllByText(/View Details/);
  expect(linkList.length).toBeGreaterThan(2);
  expect(linkList[0].href).toMatch(/\/movie\/1$/);
});

test("renders the <NavBar /> component", () => {
  render(<RouterProvider router={createRouter()} />);
  expect(document.querySelector(".navbar")).toBeInTheDocument();
});
