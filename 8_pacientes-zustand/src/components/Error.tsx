
type ErrorProps={
    children:React.ReactNode
}
function Error({children}:ErrorProps) {
  return (
    <p className='p-4 my-4 text-sm text-white bg-red-600 text-cener'>{children}</p>
  )
}

export default Error