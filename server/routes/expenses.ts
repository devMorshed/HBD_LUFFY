import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(1, "Provide Expense Title"),
  amount: z.number().int().positive().min(1, "Provide Expense Amount"),
});

const createExpenseSchema = expenseSchema.omit({ id: true });

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  { id: 1, title: "Grocery", amount: 51340 },
  { id: 2, title: "Education", amount: 34250 },
  { id: 3, title: "Utility", amount: 34350 },
  { id: 4, title: "Grocery", amount: 51340 },
  { id: 5, title: "Education", amount: 2350 },
  { id: 6, title: "Utility", amount: 354340 },
];

export const expensesRoute = new Hono()
  .get("/", (c) => {
    return c.json({
      expenses: fakeExpenses,
    });
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const data = c.req.valid("json");
    fakeExpenses.push({ id: fakeExpenses.length + 1, ...data });
    c.status(201);
    return c.json({ data });
  })
  .get("/total", (c) => {
    const total = fakeExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    return c.json({ total });
  })
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json(expense);
  })
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expenseIndex = fakeExpenses.findIndex((e) => e.id === id);
    if (!expenseIndex) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(expenseIndex, 1)[0];
    return c.json(deletedExpense);
  });
