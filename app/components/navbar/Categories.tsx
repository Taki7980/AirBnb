'use client';


import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb"
import { GiBarn, GiBoatFishing, GiCactus, GiCampfire, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi"
import { FaSkiing } from "react-icons/fa"
import { IoDiamond } from "react-icons/io5"
import { BsSnow } from "react-icons/bs"
import { MdOutlineVilla } from "react-icons/md"
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
      {
            label: 'Beach',
            icon: TbBeach,
            description: "Close to the Beach Property"
      },
      {
            label: 'Windmills',
            icon: GiWindmill,
            description: "This Property has WindMills"
      },
      {
            label: 'Modern',
            icon: MdOutlineVilla,
            description: "Property in Modern Style"
      },
      {
            label: 'CountrySide',
            icon: TbMountain,
            description: "Property in Country Side"
      },
      {
            label: 'Pools',
            icon: TbPool,
            description: "Property has a Pool!"
      },
      {
            label: 'Islands',
            icon: GiIsland,
            description: "Island property!!"
      },
      {
            label: 'Lake',
            icon: GiBoatFishing,
            description: "this property is close to a Lake!!"
      },
      {
            label: 'Sking',
            icon: FaSkiing,
            description: "this property has a skiing Slope!!"
      },
      {
            label: 'Castles',
            icon: GiCastle,
            description: "Castle property!!"
      },
      {
            label: 'Campings',
            icon: GiForestCamp,
            description: "this property has Camping Area!!"
      },
      {
            label: 'Arctic',
            icon: BsSnow,
            description: "this property has Camping Area!!"
      },
      {
            label: 'Cave',
            icon: GiCaveEntrance,
            description: "this property has Cave Area!!"
      },
      {
            label: 'Desert',
            icon: GiCactus,
            description: "this property is in the Desert!!"
      },
      {
            label: 'Barns',
            icon: GiBarn,
            description: "this property is in the Barn!!"
      },
      {
            label: 'Lux',
            icon: IoDiamond,
            description: "this property is Luxurious!!"
      },
]



const Categories = () => {
      const params = useSearchParams();
      const category = params?.get('category');
      const pathname = usePathname();

      const isMainPage = pathname === '/';

      if (!isMainPage) {
            return null;
      }

      return (
            <Container>
                  <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
                        {categories.map((items) => (
                              <CategoryBox key={items.label} label={items.label} selected={category === items.label} icon={items.icon} />
                        ))}
                  </div>
            </Container>
      )
}

export default Categories