'use client';
import useCountries from '@/app/hooks/useCountries';
import Select from 'react-select';
import { countryCodeEmoji, emojiCountryCode } from 'country-code-emoji'
import { EmojiType } from 'next/dist/compiled/@vercel/og/emoji';
// const {flag, code, name, countries} = require('country-emoji');
import { flag } from 'country-emoji';





export type CountrySelectValue = {
      flag: string;
      label: string;
      latlng: number[];
      region: string;
      value: string;
}

interface CountrySelectProps {
      value?: CountrySelectValue;
      onChange?: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {

      const { getAll } = useCountries();


      return (
            <div >
                  <Select
                        placeholder='Anywhere'
                        isClearable
                        options={getAll()}
                        value={value}
                        onChange={(value) => onChange?.(value as CountrySelectValue)}
                        formatOptionLabel={(option: any) => (
                              <div className='flex flex-row items-center gap-3'>
                                    <div>{(option.flag)}</div>
                                    <div className='font-bold'>
                                          {option.label},
                                          <span className="text-neutral-500 ml-1">
                                                {option.region}
                                          </span>
                                    </div>
                              </div>
                        )}
                        classNames={{
                              control: () => 'p-3 border-2',
                              input: () => 'text-lg',
                              option: () => 'text-lg',
                        }}
                        theme={(theme) => ({
                              ...theme,
                              borderRadius: 6,
                              colors: {
                                    ...theme.colors,
                                    primary: 'black',
                                    primary25: '#ffe4e6'
                              },

                        })}
                  />
            </div>
      )
}

export default CountrySelect