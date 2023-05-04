
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';

import RegisterModel from './components/models/RegisterModel';
import ToasterProvider from './providers/ToasterProvider';
import LogInModel from './components/models/LogInModel';
import { getCurrentUser } from './actions/getCurrentUser';

import RentModel from './components/models/RentModel';
import SearchModel from './components/models/SearchModel';




export const metadata = {
      title: 'Airbnb',
      description: 'Airbnb clone by create next app',
}
const font = Nunito({
      subsets: ["latin"],
});

export default async function RootLayout({
      children,
}: {
      children: React.ReactNode
}) {
      const currentUser = await getCurrentUser();

      return (
            <html lang="en">
                  <body className={font.className}>
                        <ClientOnly>
                              <ToasterProvider />
                              <RegisterModel />
                              <RentModel />
                              <SearchModel/>
                              <LogInModel />
                              <Navbar currentUser={currentUser} />
                        </ClientOnly>
                        <div className="pb-20 pt-28">
                              {children}
                        </div>
                  </body>
            </html>
      )
}
