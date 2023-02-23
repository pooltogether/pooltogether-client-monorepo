import { Button as FlowbiteButton, ButtonProps as FlowbiteButtonProps } from 'flowbite-react'

export interface ButtonProps extends FlowbiteButtonProps {}

export const Button = (props: ButtonProps) => {
  return <FlowbiteButton {...props} />
}
