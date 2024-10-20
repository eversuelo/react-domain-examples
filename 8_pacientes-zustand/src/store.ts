import { create } from "zustand";
import { DraftPatient, Patient } from "./types";
import { devtools,persist,createJSONStorage } from "zustand/middleware";
import { v4 as uuid } from 'uuid';
type PatientState = {
    patients: Patient[],
    addPatient: (data: DraftPatient) => void,
    deletePatient: (id: Patient['id']) => void,
    editPatient: (id: Patient['id'],data:DraftPatient) => void,
    activeId: Patient['id'] ,
    setActiveId: (id: Patient['id']) => void,

}
const createPatient = (patient: DraftPatient): Patient => {
    return { ...patient, id: uuid() }
}
const usePatientStore = create<PatientState>()(devtools(persist((set) => {
    return {
        patients: [],
        addPatient: (data) => {
            const newPatient = createPatient(data);
            set((state) => ({
                patients: [...state.patients, newPatient]
            }));
        },
        deletePatient: (id) => {
            set((state) => ({
                patients: state.patients.filter((patient) => patient.id !== id)
            }))
        },
        activeId: "",
        setActiveId: (id) => {
            set(() => ({
                activeId: id
            }))
        },
        editPatient: (id,data) => {
            set((state) => ({
                patients: state.patients.map((patient) => {
                    if (patient.id === id) {
                        return {
                            ...data,
                            id
                        }
                    }
                    return patient;
                }),
                activeId: ""
            }))
        }

    }

},{name:'patient-storage',storage:createJSONStorage(()=>{
   return localStorage;
})})));
export { usePatientStore }