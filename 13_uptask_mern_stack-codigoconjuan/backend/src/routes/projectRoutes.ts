import { Router } from "express";
import {body, param}  from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";
const router = Router();

router.get("/", ProjectController.getAllProjects);
router.post("/",
    body('projectName').optional().notEmpty().isString().withMessage('El nombre del Proyecto es requerido'),
    body('clientName').notEmpty().isString().withMessage('El nombre del Cliente es requerido'),
    body('description').notEmpty().isString().withMessage('La descripción del Proyecto es requerida'),
    handleInputErrors,
    ProjectController.createProject);
router.get("/:id",
    param('id').isMongoId().withMessage('El ID del Proyecto no es válido'),
    handleInputErrors,
     ProjectController.getProjectById);
router.put("/:id",
    param('id').isMongoId().withMessage('El ID del Proyecto no es válido'),
    body('projectName').optional().notEmpty().isString().withMessage('El nombre del Proyecto es requerido'),
    body('clientName').optional().notEmpty().isString().withMessage('El nombre del Cliente es requerido'),
    body('description').optional().notEmpty().isString().withMessage('La descripción del Proyecto es requerida'),
    handleInputErrors,
    
    ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);

/** Routes for tasks */
router.get("/:projectId/tasks", TaskController.getAllTasks);
router.post("/:projectId/tasks", 
    param('projectId').isMongoId().withMessage('El ID del Proyecto no es válido'),
    body('name').notEmpty().isString().withMessage('El nombre de la tarea es requerido'),
    body('description').notEmpty().isString().withMessage('La descripción de la tarea es requerida'),
    body('status').optional().isIn(['pending', 'in_progress', 'completed', 'under_review', 'on_hold']).withMessage('El estado de la tarea no es válido'),
    validateProjectExists,
    handleInputErrors,
        TaskController.createTask);
router.get("/:projectId/tasks/:taskId", TaskController.getTaskById);
router.put("/:projectId/tasks/:taskId", TaskController.updateTask);
router.delete("/:projectId/tasks/:taskId", TaskController.deleteTask);

export default router;