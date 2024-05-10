import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";

const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);

  useEffect(() => {
    async function fetchTotal() {
      const res = await fetch("/api/expenses/total");
      const data = await res.json();
      setTotalSpent(data.total);
    }

    fetchTotal();
  }, [totalSpent]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="space-y-2">
        <CardHeader className="space-y-4">
          <CardTitle>Expense Tracker</CardTitle>
          <CardDescription>The Total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>Total Spent: {totalSpent} Taka</CardContent>
      </Card>
    </div>
  );
};

export default App;
