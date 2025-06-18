import { InformationCircleIcon } from "@heroicons/react/24/outline"
import type { ReactNode } from "react"

type ErrorMessageProps = {
    children: ReactNode
}

export default function ErrorMessage({children} : ErrorMessageProps) {
  return (
    <>
        <div className=" flex flex-row justify-center items-center gap-2">
            <InformationCircleIcon className=" h-6 w-6 text-red-600"/>
            <p className=" text-red-600 font-semibold">{children}</p>
        </div>
    </>
  )
}
