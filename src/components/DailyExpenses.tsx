import { useBudget } from "@/hooks/useBudget";
import { getDailyChartData, getDailyData } from "@/utils";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function DailyExpenses() {

  const { state } = useBudget()

  const dailyData = getDailyData(state.expenses)
  const dailyChartData = getDailyChartData(dailyData)

  return (
    <div className="h-70">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={dailyChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Gasto"]} />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
