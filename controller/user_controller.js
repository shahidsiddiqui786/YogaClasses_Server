import User from '../model/userSchema.js'
import emailValidator from 'email-validator'

const todayDate = () => {
    var today = new Date()
    var day = String(today.getDate()).padStart(2, '0')
    var month = String(today.getMonth() + 1).padStart(2, '0')
    var year = today.getFullYear()
    console.log(month+'/'+day+'/'+year)
    return month+'/'+day+'/'+year
}

export const userSignUp = async (request, response) => {
    
    const {name,age,email,startDate,payment,batch} = request.body

    if(!name||!age||!email||!startDate||!payment||!batch){
        response.status(400).json({message:'Please Provide All Information'})
        return ;
    }
    else if(name==""||email==""||startDate=="NaN/undefinedundefined/"||batch==0)
    {
        response.status(400).json({message:'Please fill all details correctly!'})
        return ;
    }
    else
    {
       const currentDate = todayDate()
       const isEmailValid = emailValidator.validate(email)
       console.log(startDate)
        
        if(startDate<currentDate){
            response.status(401).json({message:"You can not register in past"})
            return 
        }
        else  if(isEmailValid==false){
            response.status(401).json({message:"Please Check your email address"})
            return 
        }
        else if(age<18||age>65){
            response.status(401).json({message:"Sorry! We only take person having age in between 18 & 65"})
            return 
        }

        
        User.findOne({email:email})
         .then((exist) => {
            if(exist)
            {
                const userStartDate=String(exist.startDate)                       
                const Time_difference=Number(new Date(currentDate).getTime())-Number(new Date(userStartDate).getTime())
                const Days_difference=Time_difference/(1000* 60 * 60 * 24)

                if(Days_difference > 30){
                    User.updateOne({email:email},{$set:{startDate:currentDate}})
                    .then((updatedUser)=>{
                        response.status(200).json({"message":"successfull","data":updatedUser,"message_id":"1"})
                        return 
                    }).catch((err)=>{
                            console.log(`Error in updation of new start date is ${err}`)
                            return 
                    })
                }
                else{
                    response.status(403).json({message:"User Already Register for this month"})
                    return 
                }
            }
            else{
                //Make a new document with the user information
                const userData=new User({
                    "name":name,
                    "age":age,
                    "email":email,
                    "startDate":startDate,
                    "payment":payment,
                    "batch":batch
                })
                
                userData.save()
                .then((data)=>{
                    response.status(401).json({message:"successful",data:data})
                    return 
                }).catch((err)=>{
                    console.log(`Error in inserting new user is ${err}`)
                })
            }
         })
        .catch((err) => 
            console.log(`Error in finding existing user is ${err}`)
        )
    }
}
