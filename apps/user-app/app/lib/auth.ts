import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";


// interface credentialsType {
//     email: string;
//     password:string;
// }


export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "hy@gmail.com" },
            password: { label: "Password", type: "password" }
          },

          
          async authorize(credentials:any ) {
            console.log("credentials data",credentials)
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    email: credentials.email
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    console.log("existing user from credentials",existingUser)
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.email
                    }
                }
                return null;
            }

            try {
                const user = await db.user.create({
                    data: {
                        email: credentials.email,
                        password: hashedPassword
                    }
                });
            
                return {
                    id: user.id.toString(),
                    name: user.name,
                    email: user.email
                }
            } catch(e) {
                console.error(e);
            }

            return null
          },
        }),
      GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret:process.env.GOOGLE_SECRET || ""
          })
    ],
    callbacks: {
        async signIn({account,profile}:any){
            if(account.provider === "google"){
                try{

                    const existingUser = await db.user.findFirst({
                        where:{
                            email: profile.email
                        }
                    })
                    if (existingUser) {
                    console.log("existing user from google",existingUser);
                            return {
                                id: existingUser.id.toString(),
                                name: existingUser.name,
                                email: existingUser.email
                            }
                    }

                    else{
                    const hashedPassword = await bcrypt.hash(profile.email, 10);
                        const newUser = await db.user.create({
                            data:{
                                email: profile.email,
                                password: hashedPassword,
                                name: profile.name
                            }
                        });
                        console.log("new user from google",newUser);
                        return{
                            id: newUser.id.toString(),
                            name:newUser.name,
                            email:newUser.email
                        }
                    }
                }
                catch(e){
                    console.log("err while singin callback",e);
                }
            }

            return true;
        },
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            
            //here we are giving condition if the user is having image that means it is logged in by google provider 
            //so do db operation and get the user id because the google provider give random google id into token subject(sub), which is false and give pain in ass while fetching user data from db from frontend
            if(session.user.image){
                const userData = await db.user.findFirst({
                    where:{
                        email : session.email
                    }
                });

                //if no image in user data of session that means user is signed in by credentials so we can use jwt sub which is same as user id  of user in db 
                session.user.id = userData?.id;
                return session
            }
 
                session.user.id = token.sub
                return session
       
        }
    },
    secret: process.env.JWT_SECRET || "secret",
  }
 