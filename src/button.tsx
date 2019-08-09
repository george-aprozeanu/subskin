import * as React from "react"
import {ButtonHTMLAttributes} from "react"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button(props: ButtonProps) {
	return <button {...{props}}>{props.children}</button>
}
