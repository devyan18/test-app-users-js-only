import { model, Schema } from 'mongoose'

const taskSchema = new Schema({
  titleOfTask: {
    type: String,
    required: true,
    trim: true
  },
  descriptionOfTask: {
    type: String,
    required: true
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  done: {
    type: Boolean,
    default: false
  }
})

export const workspaceSchema = new Schema({
  nameOfWorkspace: {
    type: String,
    required: true,
    trim: true
  },
  descriptionOfWorkspace: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
}, {
  timestamps: true,
  versionKey: false
})

workspaceSchema.set('toJSON', {
  transform: (doc, { __v, ...rest }, options) => {
    rest.id = rest._id.toString()
    delete rest._id
    return rest
  }
})

taskSchema.set('toJSON', {
  transform: (doc, { __v, ...rest }, options) => {
    rest.id = rest._id.toString()
    delete rest._id
    return rest
  }
})

export const TaskModel = model('Task', taskSchema)
export const WorkspaceModel = model('Workspace', workspaceSchema)
