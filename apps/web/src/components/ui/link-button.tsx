import type { VariantProps } from 'class-variance-authority'
import type { LinkProps } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button-styles'
import { cn } from '@/lib/utils'

type LinkButtonProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string
  }

export function LinkButton({
  className,
  size,
  variant,
  ...props
}: LinkButtonProps) {
  return <Link className={cn(buttonVariants({ size, variant }), className)} {...props} />
}
