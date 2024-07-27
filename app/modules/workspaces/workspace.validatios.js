import { body, param } from 'express-validator'
import { validate } from '../../middlewares/valid.middlewares.js'

const create = [
  body('nameOfWorkspace').isString().notEmpty(),
  body('descriptionOfWorkspace').isString().notEmpty()
]

const tasksChanges = [
  param('workspaceId').isMongoId(),
  param('taskId').isMongoId()
]

const createTask = [
  param('workspaceId').isMongoId(),
  body('titleOfTask').isString().notEmpty(),
  body('descriptionOfTask').isString().notEmpty()
]

export const createValidations = [create, validate]
export const tasksChangesValidations = [tasksChanges, validate]
export const createTaskValidations = [createTask, validate]
