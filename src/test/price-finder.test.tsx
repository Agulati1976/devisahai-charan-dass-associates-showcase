import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes, Outlet } from "react-router-dom";
import PriceFinder from "@/components/PriceFinder";
import Contact from "@/pages/Contact";
import prices from "../../public/prices.json";

vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));

describe("Price Finder", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => prices }));
  });
  afterEach(() => vi.unstubAllGlobals());

  it("shows the supplied PE Delhi rate and carries the selection into the contact form", async () => {
    render(<MemoryRouter initialEntries={["/prices"]}><Routes>
      <Route path="/prices" element={<PriceFinder />} />
      <Route element={<Outlet context={{ openRFQ: () => undefined }} />}>
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes></MemoryRouter>);

    await screen.findByText("Check polymer price");
    fireEvent.change(screen.getByLabelText("Type"), { target: { value: "HDPE" } });
    fireEvent.change(screen.getByLabelText("Plant"), { target: { value: "Hazira" } });
    fireEvent.change(screen.getByPlaceholderText("Type to filter grades"), { target: { value: "46GP009" } });
    fireEvent.change(screen.getAllByRole("combobox")[2], { target: { value: "46GP009" } });
    fireEvent.change(screen.getByLabelText("Delivery location"), { target: { value: "DELHI" } });
    expect(screen.getByText(/Rs 1,33,314/)).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: "Request quote" }));
    await waitFor(() => expect((screen.getByPlaceholderText("How can we help you?") as HTMLTextAreaElement).value).toContain("46GP009"));
    expect((screen.getByPlaceholderText("How can we help you?") as HTMLTextAreaElement).value).toContain("DELHI");
    expect((screen.getByPlaceholderText("How can we help you?") as HTMLTextAreaElement).value).toContain("1,33,314");
  });
});
