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
          
            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const existingUser = await db.user.findFirst({
                where: {
                    email: credentials.email
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
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
            session.user.id = token.sub
            return session
        }
    },
    secret: process.env.JWT_SECRET || "secret",
  }
 