import { useForm } from 'react-hook-form';
import Error from './Error';
import { toast } from 'react-toastify';
import { DraftPatient } from '../types';
import { usePatientStore } from '../store';
import { useEffect, useMemo } from 'react';
export default function PatientForm() {
    const addPatient = usePatientStore((state) => state.addPatient);
    const editPatient = usePatientStore((state) => state.editPatient);
    const setActiveId = usePatientStore((state) => state.setActiveId);
    const activeId = usePatientStore((state) => state.activeId);
    const isEditing = useMemo(() => activeId !== '', [activeId]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<DraftPatient>();
    const registerPatient = (data: DraftPatient) => {
        if (isEditing) {
            editPatient(activeId as string, data);
            toast.success('Paciente Editado');
        }
        else {
            addPatient(data);
            toast.success('Paciente Añadido');
        }
        setActiveId('');
        reset();
    }
    useEffect(() => {
        if (isEditing) {
            const patient = usePatientStore.getState().patients.find((patient) => patient.id === activeId);
            if (patient) {
                reset(patient);
            }
        }else{
            reset();
        }
    }
        , [activeId, isEditing, reset]);
    return (
        <div className="mx-5 md:w-1/2 lg:w-2/5">
            <h2 className="text-3xl font-black text-center">Seguimiento Pacientes</h2>

            <p className="mt-5 mb-10 text-lg text-center">
                Añade Pacientes y {''}
                <span className="font-bold text-indigo-600">Administralos</span>
            </p>

            <form
                onSubmit={handleSubmit(registerPatient)}
                className="px-5 py-10 mb-10 bg-white rounded-lg shadow-md"
                noValidate
            >
                <div className="mb-5">
                    <label htmlFor="name" className="text-sm font-bold uppercase">
                        Paciente
                    </label>
                    <input
                        id="name"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Nombre del Paciente"
                        {...register('name', { required: 'El nombre del paciene es obligatorio.' })}

                    />

                    {errors.name && (<Error>{errors.name.message}</Error>)}
                </div>

                <div className="mb-5">
                    <label htmlFor="caretaker" className="text-sm font-bold uppercase">
                        Propietario
                    </label>
                    <input
                        id="caretaker"
                        className="w-full p-3 border border-gray-100"
                        type="text"
                        placeholder="Nombre del Propietario"
                        {...register('caretaker', { required: 'El nombre del paciene es obligatorio.' })}
                    />
                    {errors.caretaker && (<Error>{errors.caretaker.message}</Error>)}
                </div>

                <div className="mb-5">
                    <label htmlFor="email" className="text-sm font-bold uppercase">
                        Email
                    </label>
                    <input
                        id="email"
                        className="w-full p-3 border border-gray-100"
                        type="email"
                        placeholder="Email de Registro"
                        {...register("email", {
                            required: "El Email es Obligatorio",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Email No Válido'
                            }
                        })}
                    />
                    {errors.email && (<Error>{errors.email.message}</Error>)}
                </div>

                <div className="mb-5">
                    <label htmlFor="date" className="text-sm font-bold uppercase">
                        Fecha Alta
                    </label>
                    <input
                        id="date"
                        className="w-full p-3 border border-gray-100"
                        type="date"
                        {...register("date", { required: ' La fecha es obligatorio.' })}
                    />
                    {errors.date && (<Error>{errors.date.message}</Error>)}
                </div>

                <div className="mb-5">
                    <label htmlFor="symptoms" className="text-sm font-bold uppercase">
                        Síntomas
                    </label>
                    <textarea
                        id="symptoms"
                        className="w-full p-3 border border-gray-100"
                        placeholder="Síntomas del paciente"
                        {...register('symptoms', { required: ' Los sintomas son obligatorios.' })}
                    >

                    </textarea>
                    {errors.symptoms && (<Error>{errors.symptoms.message}</Error>)}
                </div>

                <input
                    type="submit"
                    className="w-full p-3 font-bold text-white uppercase transition-colors bg-indigo-600 cursor-pointer hover:bg-indigo-700"
                    value={isEditing ? 'Editar Paciente' : 'Añadir Paciente'}
                />
            </form>
        </div>
    )
}