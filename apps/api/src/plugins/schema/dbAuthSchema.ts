
export const registerSchema = {
   body :{
    type:"object",
    required : ["name","email", "password","confirmPassword"],
    properties: {
        email : {type:"string", format:"email"},
        password: { type:"string", minLength:8 },
        confirmPassword:{ type:"string", minLength:8},
        name : { type :"string", minLength:1},
    },
    additionalProperties: false,  //rejects the extra fields
   },
   response : {
    201 : {
        type :"object",
        properties: {
            user :{
                type :"object",
                properties :{
                    id :{type: "string"},
                    email: { type : "string"},
                    name:{type:"string"},
                },
            },
        },
    },
   },
};


export const loginSchema = {
    body:{
        type:"object",
        required:["email", "password"],
        properties:{
            email:{type:"string", format:"email"},
            password:{type:"string", minLength:8},

        },
        additionalProperties: false,
    },

    response  : {
        200 :  {
            type:"object",
            properties:{
                user : {
                    type : "object",
                    properties :{
                        id:{type:"string"},
                        email:{ type: "string"},
                        name:{type: "string"},
                    },
                },
            },
        },
    },
};
