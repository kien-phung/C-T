/* eslint-disable react/prop-types */
const TestimonialCard = ({
  testiThumb,
  testiQuote,
  testiRatingIcon,
  testiName,
  testiDesignation,
  testiDesc,
}) => {
  return (
    <div className='testi-box relative text-center bg-white dark:bg-gray-800 shadow-cases px-3 sm:px-10 lg:px-4 2xl:px-10 pt-10 pb-9 rounded-md rounded-ss-[80px] transition-all duration-500 before:absolute before:right-0 before:bottom-0 before:w-0 before:h-[5px] before:rounded-lg before:z-10 before:bg-PrimaryColor-0 dark:before:bg-green-500 before:transition-all before:duration-500 hover:before:left-0 hover:before:w-full h-full flex flex-col'>
      <div className='relative flex items-center justify-center mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-4' style={{ minHeight: '340px' }}>
        <img
          src={testiThumb}
          draggable='false'
          className='mx-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300'
          alt={testiName}
          style={{ height: '300px', width: 'auto', maxWidth: '100%', objectFit: 'contain' }}
        />
      </div>
      <h5 className='font-FiraSans font-semibold inline-block text-HeadingColor-0 dark:text-white text-xl pt-5 pb-1'>
        {testiName}
      </h5>
      <p className='font-FiraSans text-TextColor2-0 dark:text-gray-400 text-[15px]'>
        {testiDesignation}
      </p>
      <p className='font-FiraSans text-HeadingColor-0 dark:text-gray-300 m-auto pt-6 text-sm leading-relaxed flex-grow'>
        {testiDesc}
      </p>
      <ul className='flex gap-[6px] items-center justify-center mt-8'>
        <li className='text-[#ffb609] text-xl'>{testiRatingIcon}</li>
        <li className='text-[#ffb609] text-xl'>{testiRatingIcon}</li>
        <li className='text-[#ffb609] text-xl'>{testiRatingIcon}</li>
        <li className='text-[#ffb609] text-xl'>{testiRatingIcon}</li>
        <li className='text-[#ffb609] text-xl'>{testiRatingIcon}</li>
      </ul>
    </div>
  );
};

export default TestimonialCard;
