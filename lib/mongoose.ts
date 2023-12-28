import mongoose , {ConnectOptions} from 'mongoose'

let isConnected: boolean = false

export const connectToDatabase = async() => {
  mongoose.set('strictQuery', true);

  if(!process.env.MONGODB_URI){
   return console.log('No MongoDB URI provided')
  }

  if(isConnected){
    return
  }

  try {
    const options:ConnectOptions = {
      dbName: "nextjs-project",
      autoCreate: true,
    }

    await mongoose.connect(process.env.MONGODB_URI, options)
    isConnected = true
    console.log('Connected to MongoDB')
    
  } catch (error) {
    console.log('Error connecting to MongoDB')
  }
}