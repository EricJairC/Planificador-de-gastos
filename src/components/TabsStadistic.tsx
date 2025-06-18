
import { Calendar, PieChart } from 'lucide-react'
import ExpenseCharts from './ExpenseCharts'
import { TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import ExpenseTimeline from './ExpenseTimeline'

export default function TabsStadistics() {
  return (
    <>
      <TabsList className="grid w-full grid-cols-2 mb-3">
        <TabsTrigger value="charts" className="flex items-center gap-2 cursor-pointer">
          <PieChart className="w-4 h-4" />
          Gráficas
        </TabsTrigger>
        <TabsTrigger value="timeline" className="flex items-center gap-2 cursor-pointer">
          <Calendar className="w-4 h-4" />
          Timeline
        </TabsTrigger>
      </TabsList>

      <TabsContent value="charts" className="space-y-6">
        <ExpenseCharts />
      </TabsContent>

      <TabsContent value="timeline" className="space-y-6">
        <ExpenseTimeline />
      </TabsContent>
    </>
  )
}
