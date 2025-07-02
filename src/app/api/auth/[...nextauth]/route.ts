// import NextAuth from "next-auth"

// const handler = NextAuth({
//  providers:[
//   CredentialsProvider({
//     // The name to display on the sign in form (e.g. 'Sign in with...')
//     name: 'Credentials',
//     // The credentials is used to generate a suitable form on the sign in page.
//     // You can specify whatever fields you are expecting to be submitted.
//     // e.g. domain, username, password, 2FA token, etc.
//     // You can pass any HTML attribute to the <input> tag through the object.
//     credentials: {
//       username: { label: "Username", type: "text", placeholder: "jsmith" },
//       password: { label: "Password", type: "password" }
//     },
//     async authorize(credentials, req) {
//       // You need to provide your own logic here that takes the credentials
//       // submitted and returns either a object representing a user or value
//       // that is false/null if the credentials are invalid.
//       // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
//       // You can also use the `req` object to obtain additional parameters
//       // (i.e., the request IP address)
//       const res = await fetch("/your/endpoint", {
//         method: 'POST',
//         body: JSON.stringify(credentials),
//         headers: { "Content-Type": "application/json" }
//       })
//       const user = await res.json()

//       // If no error and we have user data, return it
//       if (res.ok && user) {
//         return user
//       }
//       // Return null if user data could not be retrieved
//       return null
//     }
//   })
// ]
// })

// export { handler as GET, handler as POST }


// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getCollection, collection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = await getCollection(collection.user_collection);
        const user = await users.findOne({ email: credentials.email });

        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) return null;

        // Remove password before returning user object
        const { password, ...userWithoutPassword } = user;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
