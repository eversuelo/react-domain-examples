import{ Project, ProjectFormData } from '@/types/index';
import api from '@/lib/axios';
export async function createProject(formData: ProjectFormData): Promise<Project> {
    try{
        const{data} = await api.post<Project>('/projects', formData)
        return data;
    }
    catch(error){
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error(String(error));
        }
    }
}