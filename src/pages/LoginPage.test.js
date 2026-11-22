import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "./LoginPage";
import { supabase } from "../utils/SupabaseClient";

jest.mock("../utils/SupabaseClient", () => ({
  supabase: { auth: { signInWithPassword: jest.fn(), signInWithOAuth: jest.fn() } },
}));

test("signs in with email and returns to the home page", async () => {
  supabase.auth.signInWithPassword.mockResolvedValue({ error: null });
  render(<MemoryRouter initialEntries={["/login"]}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<div>Home</div>} />
    </Routes>
  </MemoryRouter>);
  fireEvent.change(screen.getByLabelText("Email"), { target: { value: "test@example.com" } });
  fireEvent.change(screen.getByLabelText("Password"), { target: { value: "password" } });
  fireEvent.click(screen.getByRole("button", { name: "Sign in with Email" }));
  await waitFor(() => expect(screen.getByText("Home")).toBeInTheDocument());
  expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
    email: "test@example.com", password: "password",
  });
});
