'use client';

import { Calendar, Range, RangeKeyDict } from 'react-date-range';
import Calender from '../inputs/Calender';
import Button from '../Button';

interface ListingReservationProps {
      price: number;
      totalPrice: number;
      onChangeDate: (value: Range) => void;
      dateRange: Range;
      onSubmit: () => void;
      disabled?: boolean;
      disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({ price, totalPrice, onChangeDate, dateRange, onSubmit, disabled, disabledDates }) => {
      return (
            <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
                  <div className="flex flex-row items-center gap-1 p-4">
                        <div className="text-2xl font-semibold">
                              $ {price}
                        </div>
                        <div className="font-light text-neutral-600 ">
                              night
                        </div>
                  </div>
                  <hr />
                  <Calender value={dateRange} disabledDates={disabledDates} onChange={(value)=>onChangeDate(value.selection)} />
                  <div className="p-4">
                        <Button label='Reserve' onClick={onSubmit} disabled={disabled} />
                  </div>
                  <hr />
                  <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
                        <div className="">total</div>
                        <div className="">$ {totalPrice}</div>
                  </div>
            </div>
      )
}

export default ListingReservation