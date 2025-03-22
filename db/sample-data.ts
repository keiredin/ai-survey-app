import { hashSync } from "bcrypt-ts-edge";

const sampleData = {
  users: [
    {
      name: "John",
      email: "john@example.com",
      password: hashSync("123456", 10),
  
    },
    {
      name: "Jane",
      email: "jane@example.com",
      password: hashSync("123456", 10),
    },
  ],

 
};

export default sampleData;
