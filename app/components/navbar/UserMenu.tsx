'use client';
import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback, useState } from 'react';
import MenuItem from './MenuItem';
import useRegisterModel from '@/app/hooks/useRegisterModel';
import LogInModel from '../models/LogInModel';
import useLoginModel from '@/app/hooks/useLogInModel';
import { User } from '@prisma/client';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import useRentModel from '@/app/hooks/useRentModel';
import { useRouter } from 'next/navigation';


interface UserMenuProps {
      currentUser?: SafeUser | null,
}




const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
      const router = useRouter()
      const registerModel = useRegisterModel();
      const LogInModel = useLoginModel();
      const RentModel = useRentModel();
      const [isOpen, setIsOpen] = useState(false);
      const toggleOpen = useCallback(() => {
            setIsOpen((value => !value));
      }, [])

      const onRent = useCallback(() => {
            if (!currentUser) {
                  return LogInModel.onOpen();
            }
            RentModel.onOpen();
      }, [currentUser, LogInModel, RentModel])

      return (
            <div className="relative">
                  <div className="flex flex-row items-center gap-3">
                        <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer" onClick={onRent}>
                              Airbnb your home
                        </div>
                        <div className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition" onClick={toggleOpen}>
                              <AiOutlineMenu />
                              <div className="hidden md:block">
                                    <Avatar src={currentUser?.image} />
                              </div>
                        </div>
                  </div>
                  {isOpen && (
                        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                              <div className="flex flex-col cursor-pointer">
                                    {currentUser ? (
                                          <>

                                                <MenuItem onClick={() => router.push('/trips')} lable='My trips' />
                                                <MenuItem onClick={() => router.push('/favorites')} lable='My favorites' />
                                                <MenuItem onClick={() => router.push('/reservations')} lable='My Reservations' />
                                                <MenuItem onClick={() => router.push('/myProperties')} lable='My Properties' />
                                                <MenuItem onClick={RentModel.onOpen} lable='Airbnb Your Home' />
                                                <hr />
                                                <MenuItem onClick={() => { signOut() }} lable='Log Out' />

                                          </>
                                    ) : (
                                          <>
                                                <div className="py-2 border-b-2 border-gray-200">
                                                      <MenuItem onClick={LogInModel.onOpen} lable='Login' />
                                                      <MenuItem onClick={registerModel.onOpen} lable='SignUp' />
                                                </div>

                                          </>
                                    )}

                              </div>
                        </div>
                  )}
            </div>
      )
}

export default UserMenu