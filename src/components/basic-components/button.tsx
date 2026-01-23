import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
    {
        variants: {
            variant: {
                default: 'bg-amber-600 text-slate-950 font-bold hover:bg-amber-500 shadow-lg shadow-amber-900/20 uppercase tracking-wider',
                destructive: 'bg-red-900 text-red-100 hover:bg-red-800 border border-red-700/50 shadow-lg',
                outline: 'border border-amber-600/50 bg-transparent text-amber-500 hover:bg-amber-600/10 hover:border-amber-500',
                secondary: 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700 shadow-inner',
                ghost: 'text-slate-400 hover:text-amber-500 hover:bg-slate-800',
                link: 'text-amber-600 underline-offset-4 hover:underline'
            },
            size: {
                default: 'h-10 px-6 py-3 rounded-xl',
                sm: 'h-8 rounded-lg px-3 text-xs',
                lg: 'h-12 rounded-2xl px-10 text-base',
                icon: 'h-10 w-10 rounded-xl'
            }
        },
        defaultVariants: {
            variant: 'default',
            size: 'default'
        }
    }
);

export type ButtonProps = {
    asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button';

        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        );
    }
);
Button.displayName = 'Button';

export { Button, buttonVariants };