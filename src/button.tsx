import * as React from "react"

export interface ButtonProps {
	label: string;
}

export function Button({label, ...props}: ButtonProps) {
	return <button {...{props}}>{label}</button>
}
