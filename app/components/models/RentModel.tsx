'use client';
import React, { useMemo, useState } from 'react'
import Model from './Model'
import useRentModel from '@/app/hooks/useRentModel';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import CountrySelect from '../inputs/CountrySelect';

import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';



enum STEPS {
      CATEGORY = 0,
      LOCATION = 1,
      INFO = 2,
      IMAGES = 3,
      DESCRIPTION = 4,
      PRICE = 5,
}


const RentModel = () => {
      const router = useRouter();
      const rentModel = useRentModel();
      const [step, setStep] = useState(STEPS.CATEGORY);
      const [isLoading, setLoading] = useState(false);

      const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
            defaultValues: {
                  category: '',
                  location: null,
                  guestCount: 1,
                  roomCount: 1,
                  bathroomCount: 1,
                  imageSrc: '',
                  price: 1,
                  title: '',
                  description: '',
            }
      });
      const category = watch('category');
      const location = watch('location');
      const guestCount = watch('guestCount');
      const roomCount = watch('roomCount');
      const bathroomCount = watch('bathroomCount');
      const imageSrc = watch('imageSrc');
      const price = watch('price');
      const description = watch('description');







      const Map = useMemo(() => dynamic(() => import('../Map'), {
            ssr: false
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }), [location])

      const setCustomValues = (id: string, value: any) => {
            setValue(id, value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
            });

      }

      const onBack = () => {
            setStep((value) => value - 1);
      }
      const onNext = () => {
            setStep((value) => value + 1);
      }

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
            if (step !== STEPS.PRICE) {
                  return onNext();
            }
            setLoading(true);
            axios.post('/api/listings', data)
                  .then(() => {
                        toast.success('Listing created successfully');
                        router.refresh();
                        reset();
                        setStep(STEPS.CATEGORY);
                        rentModel.onClose();
                  }).catch(() => {
                        toast.error('Something went wrong');
                  }).finally(() => {
                        setLoading(false);
                  })
      }

      const actionLabel = useMemo(() => {
            if (step === STEPS.PRICE) { return 'Create' };
            return 'Next';

      }, [step])
      const secondaryActionLabel = useMemo(() => {
            if (step === STEPS.CATEGORY) { return null };
            return 'Back';
      }, [step])


      let bodyContent = (
            <div className="flex flex-col gap-8 w-[100%]">
                  <Heading title='which of these best descride your place'
                        subtitle='Pick a Category'
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                        {categories.map((items) => (
                              <div key={items.label} className="col-span-1">
                                    <CategoryInput onClick={(category) => setCustomValues('category', category)} selected={category === items.label} label={items.label} icon={items.icon} />
                              </div>
                        ))}
                  </div>
            </div>
      )
      if (step === STEPS.LOCATION) {
            bodyContent = (
                  <div className="flex flex-col gap-8 w-[100%]">
                        <Heading title='where is your place located' subtitle='Help guests find your place' />
                        <CountrySelect value={location} onChange={(value) => setCustomValues('location', value)} />
                        <Map center={location?.latlng} />
                  </div>
            )
      }
      if (step === STEPS.INFO) {
            bodyContent = (
                  <div className="flex flex-col gap-8 w-[100%]">
                        <Heading title='Share some basic about your place' subtitle='what amenities do you have' />
                        <Counter title='Guests' subtitle='How many guests do you allow?' value={guestCount}
                              onChange={(value) => setCustomValues('guestCount', value)}
                        />
                        <hr />
                        <Counter title='Rooms' subtitle='How many rooms do you Have?' value={roomCount}
                              onChange={(value) => setCustomValues('roomCount', value)}
                        />
                        <hr />
                        <Counter title='bathroom' subtitle='How many bathrooms do you Have?' value={bathroomCount}
                              onChange={(value) => setCustomValues('bathroomCount', value)}
                        />
                  </div>
            )
      }
      if (step === STEPS.IMAGES) {
            bodyContent = (
                  <div className="flex flex-col gap-8 w-[100%]">
                        <Heading title='Upload a photo of your place' subtitle='Show guests what your place looks like!' />
                        <ImageUpload value={imageSrc} onChange={(value) => setCustomValues('imageSrc', value)} />
                  </div>
            )
      }
      if (step === STEPS.DESCRIPTION) {
            bodyContent = (
                  <div className="flex flex-col gap-8 w-[100%]">
                        <Heading title='Describe your place' subtitle='Tell guests what you are offering' />
                        {/* <textarea className="w-full h-[200px] resize-none" {...register('description')} /> */}
                        <Input id='title' label='Title' disabled={isLoading} register={register} errors={errors}
                              required
                        />
                        <hr />
                        <Input id='description' label='Description' disabled={isLoading} register={register} errors={errors} />
                  </div>
            )
      };
      if (step === STEPS.PRICE) {
            bodyContent = (
                  <div className="flex flex-col gap-8 w-[100%]">
                        <Heading title='Price your place' subtitle='How much do you charge per night?' />
                        <Input id='price' label='Price' disabled={isLoading} formatPrice={true} type='number' register={register} errors={errors} required />
                  </div>
            )
      };

      return (
            <Model
                  isOpen={rentModel.isOpen}
                  onClose={rentModel.onClose}
                  onSubmit={handleSubmit(onSubmit)}
                  actionLabel={actionLabel}
                  secondaryActionLabel={secondaryActionLabel}
                  secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
                  title='Airbnb Your Home'
                  body={bodyContent}
            />

      )
}

export default RentModel


