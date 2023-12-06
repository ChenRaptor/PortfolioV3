import './globals.scss'
import { Inter } from 'next/font/google'
import { Session } from 'next-auth'
import { headers } from 'next/headers'
import AuthContext from '@/components/Provider/AuthContext'
import ProjectsProvider from '@/components/Provider/Projects/main'
import DateProvider from '@/components/Provider/Date/main'
import BlogProvider from '@/components/Provider/Blog/main'
import ClientProvider from '@/components/Provider/Client/main'


async function getSession(cookie: string): Promise<Session> {
    const response = await fetch(`${process.env.LOCAL_AUTH_URL}/api/auth/session`, {
        headers: {
        cookie,
        },
    });
    const session = await response.json();
    return Object.keys(session).length > 0 ? session : null;
}


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Antoine Bonneau DevFolio',
    description: `Découvrez les projets et compétences d'Antoine Bonneau, étudiant et développeur passionné.`,
}



export default async function RootLayout({children} : {children: React.ReactNode}) {
    const session = await getSession(headers().get('cookie') ?? '');

    return (
        <html lang="en" className={inter.className}>
            <body className={inter.className}>
                <AuthContext session={session}>
                    <DateProvider>
                        <ClientProvider>
                        <ProjectsProvider>
                            <BlogProvider>
                                {children}
                            </BlogProvider>
                        </ProjectsProvider>
                        </ClientProvider>
                    </DateProvider>
                </AuthContext>
            </body>
        </html>
    )
}
