// import mongoose from "mongoose";

// export const Connection = async () => {
//     const URL = 'mongodb+srv://<project12024>:<project2024>@cluster1.qnt3tf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';
//   try {

//     await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser:true});
//     console.log('Database Connected Succesfully... ')
//   } catch (error) {
//     console.log("Error while connecting with database", error.message);
//   }
// };

// export default Connection;

import mongoose from "mongoose";

export const connection = (URL) => {
  mongoose
    .connect(process.env.MONGO_URI, URL, {
      dbNAME: "FlipkartClone",
    })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(`NOT Connected : ${err}`);
    });
};
