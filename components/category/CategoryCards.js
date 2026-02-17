import React from 'react';


const iconMap = {
  "all":
    "/icons/all.png",
  "Boating":
    "/icons/boaticon.png",
  "Scooter":
    "/icons/scootyicon.png",
  "Kayak/Paddleboard":
    "/icons/kayakicon.png",
  "Nature Trails":
    "/icons/natureicon.png",
  "Jet Ski":
    "/icons/jeticon.png",
  "Other":
    "/icons/islandicon.png",
};

export default function CategoryCards({ categories, selected, onChange, setPage }) {

  return (
    <div className='scrollbar-hide overflow-x-scroll'>
      <div className={` w-full max-xl:w-6xl flex gap-3 mb-8 px-2 mt-4`}>
        {/* <div
          onClick={() => {
            setPage(1)
            onChange({
              name: "all",
              _id: null
            })
          }}
          className={`
                rounded-xl flex w-full cursor-pointer flex-col items-center px-5 py-4 shadow-lg font-medium transition-all border hover:scale-105 duration-300
                ${selected?.name == "all"
              ? 'bg-slate-200/40 text-black border-black/40 shadow-lg scale-105'
              : 'bg-white/80 backdrop-blur border-slate-100 text-slate-700 hover:bg-white hover:border-slate-300'
            }
              `}
        >
          <img className='rounded-full h-20 w-20' src={iconMap?.all} />
          {"All"}
        </div> */}
        {categories.map((cat) => {
          const Icon = iconMap[cat?.name] || '/icons/islandicon.png';
          const isActive = selected?._id === cat._id;

          return (
            <div
              key={cat._id}
              onClick={() => {
                setPage(1)
                onChange(cat)
              }}
              className={`
                rounded-xl flex w-full min-w-[150px] cursor-pointer flex-col items-center px-5 py-4 shadow-lg font-medium transition-all border hover:scale-105 duration-300
                ${isActive
                  ? 'bg-slate-200/40 text-black border-black/40 shadow-lg scale-105'
                  : 'bg-white/80 backdrop-blur border-slate-100 text-slate-700 hover:bg-white hover:border-slate-300'
                }
              `}
            >
              <img className='rounded-full h-20 w-20' src={Icon} />
              <p className='w-36 overflow-hidden text-ellipsis text-center'>
              {cat.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}