import { ChangeEvent } from "react"

type InputPropsType = {
    className: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
export const Input = (props: InputPropsType) => <input className={props.className} type="number" value={props.value} onChange={props.onChange} />