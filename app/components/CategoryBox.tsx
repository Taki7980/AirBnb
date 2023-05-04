'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
      label: string,
      icon: IconType,
      selected?: boolean,
}

const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon: Icon, selected }) => {


      const router = useRouter();
      const params = useSearchParams();
      const handelClick = useCallback(() => {
            let currentQuerry = {};

            if (params) {
                  currentQuerry = qs.parse(params.toString());
            };

            const updatedQuerry: any = {
                  ...currentQuerry,
                  category: label
            };
            if (params?.get('category') === label) {
                  delete updatedQuerry.category;
            }
            const url = qs.stringifyUrl({
                  url: '/',
                  query: updatedQuerry
            }, { skipNull: true });
            router.push(url);
      }, [label, params, router]);

      return (
            <div onClick={handelClick} className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-500 transition cursor-pointer ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
            `}>
                  <Icon size={28} />
                  <div className="font-medium text-sm">
                        {label}
                  </div>
            </div>
      )
}

export default CategoryBox