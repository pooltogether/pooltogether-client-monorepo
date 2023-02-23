import { Card as FlowbiteCard, CardProps as FlowbiteCardProps } from 'flowbite-react'

export interface CardProps extends FlowbiteCardProps {}

export const Card = (props: CardProps) => {
  return <FlowbiteCard {...props} />
}
