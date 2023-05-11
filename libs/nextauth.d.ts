export enum Role {
    user = "user",
    admin = "admin",
}

declare module "next-auth" {
    interface User {
        username: string
        email: string
        role: Role;
        subscribed: boolean;
    }

    interface Session extends DefaultSession {
        user?: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        username: string
        email: string
        role: Role;
        subscribed: boolean;
    }
}
