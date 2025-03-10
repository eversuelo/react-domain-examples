
import { usePatientStore } from "../store"
import PatientDetails from './PatientDetails';
function PatientList() {
  const patients = usePatientStore((state) => state.patients);
  console.log(patients);
  return (
    <div
      className="w-full md:w-1/2 lg:w-3/5"
    >
      {patients.length == 0 ? (
        <p className="my-5 text-xl font-bold text-center">No hay Pacientes</p>
      ) : (<>
        <h1 className="mb-10 text-4xl font-bold text-center">Lista de <span className="text-blue-600">Pacientes</span></h1>
        <div className="p-10 bg-white h-auto max-h-[80vh]  mx-5 overflow-y-scroll  rounded-lg shadow-md md:h-auto ">
          {patients.map((patient) => (
            <PatientDetails key={patient.id} patient={patient} />
          ))}
        </div>
      </>
      )


      }
    </div>
  )
}

export default PatientList