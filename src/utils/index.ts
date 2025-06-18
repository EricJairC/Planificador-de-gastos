import type { Categories, Expense } from "@/type"
import { useMemo } from "react"

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export function formatDate(date: string): string {
  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat('es-Es', options).format(dateObj)
}

export function useCategoryInfo(expense: Expense, categories: Categories[]) {
  return useMemo(() => categories.filter(category => category.id === expense.category)[0], [expense])
}

export function getDailyData(expenses: Expense[]): Record<string, number> {
  return expenses.reduce((total, expense) => {
    const date = new Date(expense.date!.toString());
    const dateKey = date.toLocaleDateString("sv-SE");
    if (!total[dateKey]) {
      total[dateKey] = 0;
    }
    total[dateKey] += expense.amount;
    return total;
  }, {} as Record<string, number>);
}

export function getDailyChartData(dailyData: Record<string, number>) {
  return Object.entries(dailyData)
    .map(([date, amount]) => {
      const [year, month, day] = date.split('-').map(Number);
      const localDate = new Date(year, month - 1, day);
      return {
        rawDate: date,
        date: localDate.toLocaleDateString("sv-SE", {
          day: "2-digit",
          month: "2-digit",
        }),
        amount,
      };
    })
    .sort(
      (a, b) =>
        new Date(a.rawDate).getTime() - new Date(b.rawDate).getTime()
    )
    .slice(-7)
    .map(({ date, amount }) => ({ date, amount }));
}

export function formatDateToLongES(dateStr: string): string {
  const [year, month, day] = dateStr.split("-").map(Number);
  const localDate = new Date(year, month - 1, day);
  return localDate.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}