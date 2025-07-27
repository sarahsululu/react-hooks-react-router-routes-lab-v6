import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routeObjects } from "../routes";

const actors = [
  {
    name: "Benedict Cumberbatch",
    movies: ["Doctor Strange", "The Imitation Game", "Black Mass"],
  },
  {
    name: "Justin Timberlake",
    movies: ["Trolls", "Friends with Benefits", "The Social Network"],
  },
  {
    name: "Anna Kendrick",
    movies: ["Pitch Perfect", "Into The Wood"],
  },
  {
    name: "Tom Cruise",
    movies: [
      "Jack Reacher: Never Go Back",
      "Mission Impossible 4",
      "War of the Worlds",
    ],
  },
];

const createRouter = () =>
  createMemoryRouter(routeObjects, {
    initialEntries: ["/actors"],
  });

test("renders without any errors", () => {
  const errorSpy = vi.spyOn(global.console, "error");
  render(<RouterProvider router={createRouter()} />);
  expect(errorSpy).not.toHaveBeenCalled();
  errorSpy.mockRestore();
});

test("renders 'Actors Page' inside of the <h1 />", async () => {
  render(<RouterProvider router={createRouter()} />);
  const heading = await screen.findByRole("heading", { level: 1 });
  expect(heading).toHaveTextContent("Actors Page");
});

test("renders each actor's name", async () => {
  render(<RouterProvider router={createRouter()} />);
  for (const actor of actors) {
    expect(await screen.findByText(actor.name, { exact: false })).toBeInTheDocument();
  }
});

test("renders a <li /> for each movie", async () => {
  render(<RouterProvider router={createRouter()} />);
  for (const actor of actors) {
    for (const movie of actor.movies) {
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
