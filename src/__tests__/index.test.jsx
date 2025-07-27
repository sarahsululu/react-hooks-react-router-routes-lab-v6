import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routeObjects } from "../routes";

test('renders the Home component on route "/"', async () => {
  const router = createMemoryRouter(routeObjects, {
    initialEntries: ["/"],
  });
  render(<RouterProvider router={router} />);
  const heading = await screen.findByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Home Page");
});

test('renders the Actors component on route "/actors"', async () => {
  const router = createMemoryRouter(routeObjects, {
    initialEntries: ["/actors"],
  });
  render(<RouterProvider router={router} />);
  const heading = await screen.findByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Actors Page");
});

test('renders the Directors component on route "/directors"', async () => {
  const router = createMemoryRouter(routeObjects, {
    initialEntries: ["/directors"],
  });
  render(<RouterProvider router={router} />);
  const heading = await screen.findByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Directors Page");
});

test('renders the Movie component on route "/movie/:id"', async () => {
  const id = 1;
  const router = createMemoryRouter(routeObjects, {
    initialEntries: [`/movie/${id}`],
  });
  render(<RouterProvider router={router} />);
  expect(await screen.findByText(/Doctor Strange/)).toBeInTheDocument();
});

test("renders an error page when given a bad URL", async () => {
  const router = createMemoryRouter(routeObjects, {
    initialEntries: ["/bad-route"],
  });
  render(<RouterProvider router={router} />);
  const heading = await screen.findByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Oops! Looks like something went wrong.");
});
