import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar.js";

function renderWithRouter(initialPath = "/") {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/catalogo" element={<div>Catálogo Page</div>} />
          <Route path="/checkout" element={<div>Checkout Page</div>} />
        </Routes>
      </>
    </MemoryRouter>
  );
}

describe("Navbar", () => {
  test("muestra los links correctos", () => {
    renderWithRouter("/");
    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Catálogo/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Checkout/i })).toBeInTheDocument();
  });

  test("marca activo en '/' (aria-current)", () => {
    renderWithRouter("/");
    const home = screen.getByRole("link", { name: /Home/i });
    expect(home).toHaveAttribute("aria-current", "page");
  });

  test("marca activo en '/catalogo' (aria-current)", () => {
    renderWithRouter("/catalogo");
    const catalogo = screen.getByRole("link", { name: /Catálogo/i });
    expect(catalogo).toHaveAttribute("aria-current", "page");
  });

  test("navega al hacer click en 'Checkout'", async () => {
    const user = userEvent.setup();
    renderWithRouter("/");
    await user.click(screen.getByRole("link", { name: /Checkout/i }));
    expect(await screen.findByText(/Checkout Page/i)).toBeInTheDocument();
  });
});
