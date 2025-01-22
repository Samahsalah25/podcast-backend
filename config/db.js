const mongooes=require('mongoose');

require('dotenv').config();



const connectDB= async ()=>{
console.log(process.env.MONGO_URL);
    try {
        await mongooes.connect('mongodb://samahsalah2555:samahsalah2555@cluster0-shard-00-00.ybcal.mongodb.net:27017,cluster0-shard-00-01.ybcal.mongodb.net:27017,cluster0-shard-00-02.ybcal.mongodb.net:27017/?replicaSet=atlas-h9q5s4-shard-0&ssl=true&authSource=admin')
          
    console.log('تم الاتصال بقاعدة البيانات بنجاح');
    }
    catch(error){
        console.error(' فشل الاتصال بقاعدة البيانات');
        process.exit(1); 

    }
}

module.exports=connectDB;