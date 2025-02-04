import express, { Request, Response } from 'express';

import userRouter from './routes/users.routes';
import employeerRouter from './routes/employeer.routes';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/auth.routes';

const PORT = process.env.PORT || 3000;


const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/users',userRouter);
app.use('/api/employer',employeerRouter);
app.use('/api/auth',authRouter);


app.get('/',(req:Request,res:Response)=>{
    res.send('Hello World');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})