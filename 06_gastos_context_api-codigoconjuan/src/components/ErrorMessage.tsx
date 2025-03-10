type ErrorMessageProps = {
    children: React.ReactNode;
    }

function ErrorMessage({children}:ErrorMessageProps) {
  return (
    <p className="p-2 text-sm font-bold text-center text-white bg-red-600">{children}</p>
  )
}

export default ErrorMessage