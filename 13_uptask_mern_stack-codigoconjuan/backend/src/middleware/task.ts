import type{ Request, Response, NextFunction } from 'express';
import Task, { ITask } from '../models/Task';
declare global{
    namespace Express{
        interface Request{
            task: ITask;
        }
    }
}
export async function taskExists(req: Request, res: Response, next: NextFunction){
    try{
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if(!task){
            return res.status(404).json({error: 'Task not found by middleware'});
        }
        req.task = task;
        return next();
    }
    catch(error){
        console.error(error);
        return res.status(500).json({error: 'Failed to validate task'});
    }
    // Remove the unconditional next() call
}
export function validateTaskBelongsToProject(req: Request, res: Response, next: NextFunction){
    const project = req.project;
    if(req.task.project.toString() !== project.id.toString()){
        return res.status(404).json({error: 'Task not found in project'});
    }
    return next();
}
