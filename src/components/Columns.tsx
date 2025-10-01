import type { ReactNode } from "react"
import type { ColumnKey } from "../types"

type Props = {
  title: string
  column: ColumnKey
  children: ReactNode
}

export default function Column({ title, children }: Props) {
  return (
    <section className="column">
      <h3>{title}</h3>
      <div className="stack">{children}</div>
    </section>
  )
}
