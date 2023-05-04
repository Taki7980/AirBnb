'use client';
import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModel from '@/app/hooks/useRegisterModel';
import Model from './Model';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast'
import Button from '../Button';
import useLoginModel from '@/app/hooks/useLogInModel';
import { signIn } from 'next-auth/react';




const RegisterModel = () => {
      const registerModel = useRegisterModel();
      const LogInModel = useLoginModel();
      const [isLoading, setIsLoading] = useState(false);

      const { register, handleSubmit, formState: { errors, } } = useForm<FieldValues>({
            defaultValues: {
                  name: '',
                  email: '',
                  password: '',
            }
      });

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
            setIsLoading(true);

            axios.post('/api/register', data)
                  .then(() => {
                        toast.success("Account Created");
                        registerModel.onClose();
                        LogInModel.onOpen();
                  }).catch((error) => {
                        toast.error("something went wrong");
                  }).finally(() => {
                        setIsLoading(false);
                  })
      }


      const bodyContent = (
            <div className="flex flex-col gap-4 w-full">
                  <Heading title='Welcome to Airbnb' subtitle='Create an Account' />
                  <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
                  <Input id='name' label='Name' disabled={isLoading} register={register} errors={errors} required />
                  <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
            </div>
      )

      // const RunBoth =()=>{
      //       registerModel.onClose();
      //       LogInModel.onOpen();
      // }
      const RunBoth = useCallback(()=>{
            registerModel.onClose();
            LogInModel.onOpen();
      },[registerModel,LogInModel]);

      const FooterContent = (
            <div className="flex flex-col gap-4 mt-3">
                  <hr />
                  <Button outLine label='Continue with google' icon={FcGoogle} onClick={() => signIn('google')} />
                  <Button outLine label='Continue with Github' icon={AiFillGithub} onClick={() =>  signIn('github') } />
                  <div className="text-neutral-500 flex text-center mt-4 font-light justify-center">
                        <div className="flex flex-row items-center gap-2">
                              <div>
                                    Already have an Account?
                              </div>
                              <div onClick={(RunBoth)} className=" text-neutral-800 cursor-pointer hover:underline">
                                    Log In
                              </div>
                        </div>
                  </div>
            </div>
      )

      return (
            <Model
                  disabled={isLoading}
                  isOpen={registerModel.isOpen}
                  title='Register'
                  actionLabel='Continue'
                  onClose={registerModel.onClose}
                  onSubmit={handleSubmit(onSubmit)}
                  body={bodyContent}
                  footer={FooterContent}
            />
      )
}

export default RegisterModel