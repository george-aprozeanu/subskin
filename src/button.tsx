import * as  React from "react"
import {ButtonHTMLAttributes} from "react"
import {createUseStyles} from 'react-jss'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const useStyles = createUseStyles({
	button: {
		color: 'crimson',
		border: ['solid', 1, 'orange'],
		outline: 'none',
		'&:hover': {
			background: 'red'
		}
	},
});

export function Button(props: ButtonProps) {
	const styles = useStyles();
	return <button className={styles.button} {...{props}}>{props.children}</button>
}
