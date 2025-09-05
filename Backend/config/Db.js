import mongoose  from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://muluken:mongoo123@cluster0.on9rqot.mongodb.net/Food-Del').then(()=>{
        console.log('DB connected')
    });
}
