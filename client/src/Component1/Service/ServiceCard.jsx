/* eslint-disable react/prop-types */

const ServiceCard = ({
  serviceSubTilte,
  serviceTitle,
  serviceDesc,
  serviceThumbShape,
  serviceThumb,
  thumbIcon,
  contentShape,
}) => {
  return (
  <div className='service-box rounded-lg shadow-cases bg-white group relative z-10 overflow-hidden p-5 flex flex-col h-full'>
      <div className='relative'>
        {/* fixed responsive thumbnail area to keep cards balanced */}
        <div className='overflow-hidden w-full aspect-video sm:h-[220px] md:h-[260px] lg:h-[300px] xl:h-[320px] relative flex-shrink-0'>
          <img
            src={serviceThumb}
            draggable='false'
            className='w-full h-full object-cover block'
          />
          {/* Decorative icon - static (no animation, not clickable) */}
          <div className='absolute inset-0 flex items-center justify-center z-30 pointer-events-none'>
            <img
              src={thumbIcon}
              draggable='false'
              className='w-12 h-12 opacity-90'
              alt='icon'
            />
          </div>
        </div>
        {/* bottom accent bar (hidden by default, shown on hover) */}
        <div className='absolute right-0 bottom-0 left-0 h-[5px] bg-[#ff9307] scale-x-0 origin-left transform transition-transform duration-500 group-hover:scale-x-100'></div>
      </div>
      <div className='text-center relative flex-1 flex flex-col min-h-[150px] sm:min-h-[190px] md:min-h-[210px] lg:min-h-[230px] xl:min-h-[250px]'>
        <img
          src={contentShape}
          draggable='false'
          className='hidden sm:block service-content-shape absolute top-8 right-5 scale-0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100'
        />
        {serviceSubTilte ? (
          <h6 className='service-sub-title font-FiraSans text-[15px] text-white inline-block py-1 px-5 rounded overflow-hidden bg-PrimaryColor-0 uppercase mt-8 relative z-10 before:absolute before:right-0 before:top-0 before:h-full before:w-0 before:-z-10 before:bg-[#ff9307] before:transition-all before:duration-500 group-hover:before:w-full group-hover:before:left-0 mx-auto'>
            {serviceSubTilte}
          </h6>
        ) : null}
        <br />
        <div className='flex-1 flex flex-col justify-center'>
          <button className='font-FiraSans font-semibold text-xl pb-[10px] text-HeadingColor-0 mt-4'>
            {serviceTitle}
          </button>
          <p className='font-FiraSans text-TextColor2-0 pb-2 mt-2'>
            {serviceDesc}
          </p>
        </div>
        <img
          src={contentShape}
          draggable='false'
          className='hidden sm:block service-content-shape absolute bottom-3 left-8 md:left-2 scale-0 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100'
        />
      </div>
    </div>
  );
};

export default ServiceCard;
