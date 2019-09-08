import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

export const todos_db =  new Datastore({
  filename: path.join(remote.app.getPath('userData'), '/database/todos.db')
})