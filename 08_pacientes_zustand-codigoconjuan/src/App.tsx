import PatientForm from "./components/PatientForm"
import PatientList from "./components/PatientList"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <>
      <div className="container mx-auto mt-2">
        <h1 className="text-5xl font-black text-center md:w-2/3 md:mx-auto">Seguimiento de Pacientes {' '}<span className="text-indigo-700">Veterinaria</span></h1>
      </div>
      <div className="h-full mt-12 md:flex">
            <PatientForm />
            <PatientList />
      </div>
      <ToastContainer />
    </>
  )
}

export default App
