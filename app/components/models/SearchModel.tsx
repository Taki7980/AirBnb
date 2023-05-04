'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import Model from './Model'
import useSearchModel from '@/app/hooks/useSearchModel'
import { useCallback, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';

import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calender from '../inputs/Calender';
import Counter from '../inputs/Counter';


enum STEPS {
      LOCATION = 0,
      DATE = 1,
      INFO = 2,
}





const SearchModel = () => {
      const router = useRouter();
      const params = useSearchParams();
      const searchModel = useSearchModel()

      const [step, setStep] = useState(STEPS.LOCATION)
      const [guestCount, setGuestCount] = useState(1)
      const [roomCount, setRoomCount] = useState(1)
      const [bathroomCount, setBathroomCount] = useState(1)
      const [location, setLocation] = useState<CountrySelectValue>()
      const [dateRange, setDateRange] = useState<Range>({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
      })
      const Map = useMemo(() => dynamic(() => import('../Map'), {
            ssr: false
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }), [location])


      const onBack = useCallback(() => {
            setStep(value => value - 1)
      }, []);
      const onNext = useCallback(() => {
            setStep(value => value + 1)
      }, []);

      const onSubmit = useCallback(async () => {
            if (step !== STEPS.INFO) {
                  return onNext();
            };
            let currentQuery = {};

            if (params) {
                  currentQuery = qs.parse(params.toString());
            }
            const updatedQuery: any = {
                  ...currentQuery,
                  locationValue: location?.value,
                  guestCount,
                  roomCount,
                  bathroomCount,
            };
            if (dateRange.startDate) {
                  updatedQuery.startDate = formatISO(dateRange.startDate);
            }
            if (dateRange.endDate) {
                  updatedQuery.endDate = formatISO(dateRange.endDate);
            }

            const url = qs.stringifyUrl({
                  url: '/',
                  query: updatedQuery,
            }, { skipNull: true });

            setStep(STEPS.LOCATION);
            searchModel.onClose();
            router.push(url);
      }, [step, location, dateRange, guestCount, roomCount, bathroomCount, searchModel, router, onNext, params]);

      const actionLabel = useMemo(() => {
            if(step === STEPS.INFO){
                  return 'Search';
            }
            return 'Next';
      },[step]);

      const secondaryActionLabel = useMemo(() => {
            if(step === STEPS.LOCATION){
                  return undefined;
            };
            return 'Back';
      },[step]);

      let bodyContent= (
            <div className="flex flex-col gap-8 w-full">
                  <Heading title='Where do you wanna go?' subtitle='Find the best location to stay'/>
                  <CountrySelect value={location} onChange={value=>setLocation(value as CountrySelectValue)} />
                  <hr />
                  <Map center={location?.latlng} />
            </div>
      );

      if(step === STEPS.DATE){
            bodyContent = (
                  <div className="flex flex-col gap-8 w-full">
                        <Heading title='When do you wanna go?' subtitle='Choose your dates'/>
                        <Calender value={dateRange} onChange={value=>setDateRange(value.selection)} />
                  </div>
            )
      }
      if(step === STEPS.INFO){
            bodyContent = (
                  <div className="flex flex-col gap-8 w-full">
                        <Heading title='More Information' subtitle='Find your perfect place!'/>
                        <Counter title='Guests' subtitle='How many Guests are coming?' value={guestCount} onChange={value=>setGuestCount(value)} />
                        <Counter title='Rooms' subtitle='How many Rooms do you need?' value={roomCount} onChange={value=>setRoomCount(value)} />
                        <Counter title='Bathrooms' subtitle='How many Bathrooms do you need?' value={bathroomCount} onChange={value=>setBathroomCount(value)} />
                  </div>
            )
      }


      return (
            <Model
                  isOpen={searchModel.isOpen}
                  onClose={searchModel.onClose}
                  onSubmit={onSubmit}
                  title="Filters"
                  actionLabel={actionLabel}
                  body={bodyContent}
                  secondaryAction={step ===STEPS.LOCATION ? undefined : onBack}
                  secondaryActionLabel={secondaryActionLabel}
            />
      )
}

export default SearchModel