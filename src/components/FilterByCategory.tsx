import type { Categories } from "@/type";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";

export default function FilterByCategory() {

    const { dispatch, state } = useBudget()

    const filterChange = (categoryId : Categories['id']) => {
        dispatch({type: 'add-filter', payload: { id: categoryId}})
    }

    const currentFilter = state.currentCategory || "";

    return (
        <>
            <div 
                className={`text-sm rounded-xl py-1 px-3 font-semibold ${currentFilter == '' ? "bg-slate-200": "bg-slate-100"} cursor-pointer`}
                onClick={() => filterChange('')}
            >
                🎉 Todos
            </div>
            {categories.map((category) => (
                <div
                    key={category.id}
                    className={`text-sm rounded-xl py-1 px-3 font-semibold cursor-pointer ${currentFilter == category.id ? "bg-slate-200": "bg-slate-100"} `}
                    onClick={() => filterChange(category.id)}
                >
                    {category.icon} {category.name}
                </div>
            ))}
        </>
    )
}
