import { forwardRef } from 'react'

const Alert = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      {...props}
      className={`relative w-full rounded-lg border p-4 ${className ?? ''}`}
    >
      {children}
    </div>
  )
)
Alert.displayName = 'Alert'

const AlertTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h5
    ref={ref}
    {...props}
    className={`mb-1 font-medium leading-none tracking-tight ${
      className ?? ''
    }`}
  >
    {children}
  </h5>
))
AlertTitle.displayName = 'AlertTitle'

const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={`text-sm opacity-90 ${className ?? ''}`}
  />
))
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
