import { connect } from 'mongoose'

export const connectToDB = async (URI, dbName = 'test') => {
  try {
    const db = await connect(URI, { dbName })
    console.log(`Connected to ${db.connection.name} database`)
  } catch (error) {
    console.error(`An error occurred: ${error}`)
    process.exit(1)
  }
}
