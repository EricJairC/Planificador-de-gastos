import DailyExpenses from './DailyExpenses';
import ExpensesByCategory from './ExpensesByCategory';
import StatisticalData from './StatisticalData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function ExpenseCharts() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className=' h-fit'>
        <CardHeader>
          <CardTitle className=' text-lg font-semibold'>Gastos por Categoría</CardTitle>
          <CardDescription>Distribución de tus gastos por categoría</CardDescription>
        </CardHeader>
        <CardContent>
          <ExpensesByCategory/>
        </CardContent>
      </Card>
      <Card className=' h-fit'>
        <CardHeader>
          <CardTitle className=' text-lg font-semibold'>Gastos Diarios</CardTitle>
          <CardDescription>Últimos 7 días de gastos</CardDescription>
        </CardHeader>
        <CardContent>
          <DailyExpenses/>
        </CardContent>
      </Card>
      <Card className="lg:col-span-2 gap-3">
        <CardHeader>
          <CardTitle className=' text-lg font-semibold'>Estadísticas de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          <StatisticalData/>
        </CardContent>
      </Card>
    </div>
  )
}
