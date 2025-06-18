import { categories } from "@/data/categories";
import { useBudget } from "@/hooks/useBudget";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function ExpensesByCategory() {
    const { state } = useBudget();

    const categoryData = categories.map((category) => {
        const categoryExpenses = state.expenses.filter((expense) => expense.category === category.id)
        const totalCategory = categoryExpenses.reduce((total, expense) => total + expense.amount, 0)
        return {
            name: category.name,
            value: totalCategory,
            icon: category.icon
        }
    }).filter((item) => item.value > 0)

    const COLORS = ["#50A2FF", "#FFB86A", "#FFDF20", "#fda5d5", "#FF6467", "#00A63E", "#C27AFF"]
    return (
        <div className="h-70">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} data-name={entry.name}/>
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#FDFDFD', color: '#fff', borderRadius: 8, padding: '0.3rem', border: 'solid 1px #DCDFE2' }} formatter={(value) => [`$${Number(value).toLocaleString()}`, "Gasto"]} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}
