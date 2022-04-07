import { ButtonHTMLAttributes, DetailedHTMLProps } from "react"

type DefaultProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type ButtonPropsType = {
    title: string
    disabled: boolean
}
type FinishedButtonPropsType = DefaultProps & ButtonPropsType
export const Button = (props: FinishedButtonPropsType) => <button disabled={props.disabled} onClick={props.onClick}>{props.title}</button>