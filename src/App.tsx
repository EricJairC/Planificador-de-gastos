import { Tabs } from "@radix-ui/react-tabs"
import { Calendar, Plus, TimerReset } from "lucide-react"
import { useEffect } from "react"
import BudgetModal from "./components/BudgetModal"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import Expenses from "./components/Expenses"
import TabsStadistics from "./components/TabsStadistic"
import { Button } from "./components/ui/button"
import { Card } from "./components/ui/card"
import { useBudget } from "./hooks/useBudget"

function App() {

  const { state, dispatch } = useBudget()

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state])

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Planificador de Gastos</h1>
              <p className="text-slate-600 mt-1">Controla tus finanzas personales</p>
            </div>
            <div className="flex gap-2">
              {state.budget ?
                <>
                  <Button
                    variant="outline"
                    className=" text-sm cursor-pointer"
                    onClick={() => dispatch({ type: 'clean-budget' })}
                  >
                    <TimerReset className="w-4 h-4 mr-2" />
                    Reiniciar presupuesto
                  </Button>
                  <Button onClick={() => dispatch({ type: 'show-modal' })} className=" cursor-pointer">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Gasto
                  </Button>
                </>
                :
                <Button onClick={() => dispatch({ type: 'show-modal-budget' })} className=" cursor-pointer">
                  <Calendar className="w-4 h-4 mr-2" />
                  Presupuesto
                </Button>
              }
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-3">
            <div className=" lg:col-span-1 bg-white">
              <BudgetTracker />
            </div>
            <Card className="lg:col-span-2 h-[518px] gap-3">
              <Expenses />
            </Card>
          </div>
          {state.expenses.length > 0 ?
            <Tabs defaultValue="charts" className="w-full">
              <TabsStadistics />
            </Tabs>
            :
            ''
          }
        </div>
      </div>
      <ExpenseModal />
      <BudgetModal />
    </>
  )
}

export default App
