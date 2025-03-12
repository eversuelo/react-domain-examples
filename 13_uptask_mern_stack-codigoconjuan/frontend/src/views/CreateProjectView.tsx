import { Link,useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ProjectForm from "@/components/projects/ProjectForm"
import { ProjectFormData } from "@/types/index";
import { createProject } from "@/api/ProjectAPI"

export default function CreateProjectView() {
    const navigate = useNavigate()
    const initialValues: ProjectFormData = {
        "projectName": "",
        "description": "",
        "clientName": ""
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const handleForm =async  (data: ProjectFormData) => {
        await createProject(data)
            .then(() => {
                alert("Proyecto creado exitosamente")
            }).catch((error) => {
                alert("Error al crear el proyecto")
                console.error(error)
            });
        navigate("/");
    }
    return (
        <>
            <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-black">Crear Proyecto</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un Proyecto.</p>
                <nav className="mt-6">
                    <Link to="/" className="bg-blue-500 text-white p-3 rounded mt-5 hover:bg-blue-600 cursor-pointer transition-colors font-semibold">Volver</Link>
                </nav>
                <form className="mt-10 bg-white shadow-lg p-10 rounded-lg" onSubmit={handleSubmit(handleForm)} noValidate>
                    <ProjectForm register={register} errors={errors} />
                    <input type="submit" value="Crear Proyecto" className="bg-blue-500 text-white p-3 rounded mt-5 hover:bg-blue-600 cursor-pointer transition-colors font-semibold" />
                </form>
            </div>
        </>
    )
}
