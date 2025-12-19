import api from "@/lib/api";

export const loginAdmin = (data) =>
  api.post("/admin/login", data);

export const logoutAdmin = () =>
  api.post("/admin/logout");

export const getMe = () =>
  api.get("/admin/me");

export const updateMe = (data) =>
  api.put("/admin/me", data);