'use client';
import axios from 'axios';
import { signIn } from 'next-auth/react';
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
import { useRouter } from 'next/navigation';





const LogInModel = () => {
      const router = useRouter();
      const registerModel = useRegisterModel();
      const LogInModel = useLoginModel();
      const [isLoading, setIsLoading] = useState(false);

      const { register, handleSubmit, formState: { errors, } } = useForm<FieldValues>({
            defaultValues: {
                  email: '',
                  password: '',
            }
      });

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
            setIsLoading(true);
            signIn('credentials', {
                  ...data,
                  redirect: false,
            })
                  .then((callback) => {
                        setIsLoading(false);
                        if (callback?.ok) {
                              toast.success('Logged In Successfully');
                              router.refresh();
                              LogInModel.onClose()
                        }
                        if (callback?.error) {
                              toast.error(callback.error);
                        }
                  })
      }
      const RunBoth = useCallback(()=>{
            LogInModel.onClose();
            registerModel.onOpen();
      },[registerModel,LogInModel]);

      const bodyContent = (
            <div className="flex flex-col gap-4 w-full">
                  <Heading title='Welcome Back' subtitle='Log In to your Account' />
                  <Input id='email' label='Email' disabled={isLoading} register={register} errors={errors} required />
                  <Input id='password' type='password' label='Password' disabled={isLoading} register={register} errors={errors} required />
            </div>
      )

      const FooterContent = (
            <div className="flex flex-col gap-4 mt-3">
                  <hr />
                  <Button outLine label='Continue with google' icon={FcGoogle} onClick={() => signIn('google')} />
                  <Button outLine label='Continue with Github' icon={AiFillGithub} onClick={() => signIn('github')} />
                  <div className="text-neutral-500 flex text-center mt-4 font-light justify-center">
                        <div className="flex flex-row items-center gap-2">
                              <div>
                                    {`Don't have an Account?`}
                              </div>
                              <div onClick={RunBoth} className=" text-neutral-800 cursor-pointer hover:underline">
                                    Sign Up
                              </div>
                        </div>
                  </div>
            </div>
      )

      return (
            <Model
                  disabled={isLoading}
                  isOpen={LogInModel.isOpen}
                  title='Log In'
                  actionLabel='Continue'
                  onClose={LogInModel.onClose}
                  onSubmit={handleSubmit(onSubmit)}
                  body={bodyContent}
                  footer={FooterContent}
            />
      )
}

export default LogInModel;