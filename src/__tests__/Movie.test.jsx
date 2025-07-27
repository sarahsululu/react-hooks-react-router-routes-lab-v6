import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routeObjects } from "../routes";

const createRouter = (id = 1) =>
  createMemoryRouter(routeObjects, {
    initialEntries: [`/movie/${id}`],
  });

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");
  render(<RouterProvider router={createRouter()} />);
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
});

test("renders movie's title in an h1", async () => {
  render(<RouterProvider router={createRouter()} />);
  const h1 = await screen.findByRole("heading", { level: 1 });
  expect(h1).toHaveTextContent("Doctor Strange");
});

test("renders movie's time within a p tag", async () => {
  render(<RouterProvider router={createRouter()} />);
  const p = await screen.findByText(/115/);
  expect(p).toBeInTheDocument();
  expect(p.tagName).toBe("P");
});

test("renders a span for each genre", async () => {
  render(<RouterProvider router={createRouter()} />);
  const genres = ["Action", "Adventure", "Fantasy"];
  await Promise.all(
    genres.map(async (genre) => {
      const span = await screen.findByText(genre);
      expect(span).toBeInTheDocument();
      expect(span.tagName).toBe("SPAN");
    })
  );
});

test("renders the <NavBar /> component", async () => {
  render(<RouterProvider router={createRouter()} />);
  expect(await screen.findByRole("navigation")).toBeInTheDocument();
});

