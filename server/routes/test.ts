import { Hono } from "hono";

export const testRoute = new Hono()
  .get("/", (c) => {
    return c.json({ test: [] });
  })
  .post("/", (c) => {
    return c.json({ message: "This is a post req to testroute" });
  })
  .delete("/", (c) => {
    return c.json({ message: "SOmething need to be deleted?" });
  });
