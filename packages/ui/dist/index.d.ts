import { ButtonProps, CardProps } from 'flowbite-react';
export { Flowbite } from 'flowbite-react';
import { ReactNode } from 'react';

declare const Button: (props: ButtonProps) => JSX.Element;

declare const NavBar: (props: {
    children: ReactNode;
}) => JSX.Element;

declare const Card: (props: CardProps) => JSX.Element;

export { Button, Card, NavBar };
