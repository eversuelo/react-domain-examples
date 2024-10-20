
import { toast } from 'react-toastify';
import { usePatientStore } from '../store';
import { Patient } from '../types/index';
type PatientDetailsProps={
  patient:Patient,
}
function PatientDetails(
  {patient}:PatientDetailsProps
) {

  const {deletePatient,setActiveId}=usePatientStore((state)=>state);
  return (
    <div className="p-4 my-4 bg-gray-100 rounded-lg shadow-md">
      <p className="mb-3 font-bold text-gray-700 uppercase">ID: {' '} <span className="font-normal normal-case">{patient.id}</span></p>
      <p className="mb-3 font-bold text-gray-700 uppercase">Nombre: {' '} <span className="font-normal normal-case">{patient.name}</span></p>
      <p className="mb-3 font-bold text-gray-700 uppercase">Propietario: {' '} <span className="font-normal normal-case">{patient.caretaker}</span></p>
      <p className="mb-3 font-bold text-gray-700 uppercase">Email: {' '} <span className="font-normal normal-case">{patient.email}</span></p>
      <p className="mb-3 font-bold text-gray-700 uppercase">Síntomas: {' '} <span className="font-normal normal-case">{patient.symptoms}</span></p>
      <div className='flex justify-between gap-3 mt-10'>
        <button title='Eliminar'
         onClick={() => {
          toast.error(`Paciente ${patient.name} eliminado`)  
          deletePatient(patient.id)
        }}
        className='px-4 py-2 text-white bg-red-500 rounded-lg'>Eliminar</button>
        <button 
        onClick={() => {setActiveId(patient.id)}}
        title='Editar' className='px-4 py-2 text-white bg-green-500 rounded-lg'>Editar</button>
      </div>
    </div>
  );
}

export default PatientDetails