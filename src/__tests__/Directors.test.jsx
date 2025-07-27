import "@testing-library/jest-dom";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { routeObjects } from "../routes";

const directors = [
  {
    name: "Scott Derrickson",
    movies: ["Doctor Strange", "Sinister", "The Exorcism of Emily Rose"],
  },
  {
    name: "Mike Mitchell",
    movies: ["Trolls", "Alvin and the Chipmunks: Chipwrecked", "Sky High"],
  },
  {
    name: "Edward Zwick",
    movies: ["Jack Reacher: Never Go Back", "Blood Diamond", "The Siege"],
  },
];

const createRouter = () =>
  createMemoryRouter(routeObjects, {
    initialEntries: ["/directors"],
  });

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");
  render(<RouterProvider router={createRouter()} />);
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
});

test("renders 'Directors Page' inside of a <h1 />", async () => {
  render(<RouterProvider router={createRouter()} />);
  const heading = await screen.findByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Directors Page");
});

test("renders each director's name", async () => {
  render(<RouterProvider router={createRouter()} />);
  for (const director of directors) {
    expect(await screen.findByText(director.name, { exact: false })).toBeInTheDocument();
  }
});

test("renders a <li /> for each movie", async () => {
  render(<RouterProvider router={createRouter()} />);
  for (const director of directors) {
    for (const movie of director.movies) {
      const li = await screen.findByText(movie, { exact: false });
      expect(li).toBeInTheDocument();
      expect(li.tagName).toBe("LI");
    }
  }
});

test("renders the <NavBar /> component", () => {
  render(<RouterProvider router={createRouter()} />);
  expect(document.querySelector(".navbar")).toBeInTheDocument();
});
