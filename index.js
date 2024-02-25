const express = require('express');
const Routes = require('./router/index');
const {connection,connectToDatabase}=require('./config/MySQL')
const PORT =8090;

const app = express();
app.use(express.json())

app.use('/api', Routes);
connectToDatabase().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

})