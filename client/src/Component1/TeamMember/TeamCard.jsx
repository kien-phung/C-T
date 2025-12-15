/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const TeamCard = ({
  teamThumb,
  teamShare,
  socialIcon,
  socialIcon2,
  socialIcon3,
  teamTitle,
  teamDesc,
  teamShape,
  facebookUrl,
  twitterUrl,
  linkedinUrl,
}) => {
  return (
    <div className='group relative bg-white dark:bg-gray-800 rounded-md shadow-lg overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-0 before:bg-BodyBg4-0 dark:before:bg-gray-700 before:-z-10 before:transition-all before:rounded-md before:duration-500 hover:before:h-full min-h-[340px] flex flex-col'>
      <div className='relative z-20 overflow-hidden rounded before:absolute before:top-0 before:left-0 before:bg-right-top before:bg-PrimaryColor-0 before:bg-opacity-30 before:w-0 before:h-0 before:transition-all before:duration-500 before:z-10 group-hover:before:h-full group-hover:before:w-full'>
        <div className='flex justify-center pt-6 sm:pt-8 md:pt-10'>
          <img
            src={teamThumb}
            alt={teamTitle}
            className='w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full object-contain shadow-md'
          />
        </div>
        <div className='absolute z-30 top-5 right-5'>
          <Link to={'/'}>
            <button className='size-[42px] flex justify-center items-center rounded-full overflow-hidden relative bg-PrimaryColor-0 dark:bg-green-600 text-white text-xl'>
              {teamShare}
            </button>
          </Link>
        </div>
        <ul>
          <li className='absolute z-20 top-5 right-[24px] transition-all duration-300 group-hover:top-[72px]'>
            <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
              <button className='size-9 text-sm flex justify-center items-center rounded-full overflow-hidden relative bg-white dark:bg-gray-700 transition-all duration-500 hover:text-white text-HeadingColor-0 dark:text-white z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-Secondarycolor-0 dark:before:bg-green-600 before:-z-10 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                {socialIcon}
              </button>
            </a>
          </li>
          <li className='absolute z-20 top-5 right-[24px] transition-all duration-500 group-hover:top-[119px]'>
            <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
              <button className='size-9 text-sm flex justify-center items-center rounded-full overflow-hidden relative bg-white dark:bg-gray-700 transition-all duration-500 hover:text-white text-HeadingColor-0 dark:text-white z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-Secondarycolor-0 dark:before:bg-green-600 before:-z-10 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                {socialIcon2}
              </button>
            </a>
          </li>
          <li className='absolute z-20 top-5 right-[24px] transition-all duration-700 group-hover:top-[166px]'>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <button className='size-9 text-sm flex justify-center items-center rounded-full overflow-hidden relative bg-white dark:bg-gray-700 transition-all duration-500 hover:text-white text-HeadingColor-0 dark:text-white z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-Secondarycolor-0 dark:before:bg-green-600 before:-z-10 before:transition-all before:duration-500 before:scale-0 hover:before:scale-100'>
                {socialIcon3}
              </button>
            </a>
          </li>
        </ul>
      </div>
  <div className='relative transition-all duration-500 group-hover:border-Secondarycolor-0 text-center pt-6 pb-2 z-10'>
        <h5 className='font-FiraSans font-medium text-[22px] text-HeadingColor-0 dark:text-white pb-[2px]'>
          {teamTitle}
        </h5>
        <p className='font-FiraSans text-TextColor2-0 dark:text-gray-300'>
          {teamDesc}
        </p>
      </div>
      <div className='absolute -z-50 left-1/2 -translate-x-1/2 bottom-0 transition-all duration-500 group-hover:-bottom-8'><img src={teamShape} draggable='false' className='max-w-[inherit]'/></div>
    </div>
  );
};

export default TeamCard;
