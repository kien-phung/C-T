import TeamCard from './TeamCard';
import teamThumb from '/images/members/ceo.png';
import teamThumb2 from '/images/members/engineer.png';
import teamThumb3 from '/images/members/it.png';
import teamThumb4 from '/images/members/sales.png';
import teamThumb5 from '/images/members/staff.png';
import teamShape from '/images/team-dot.png';
import circleShape from '/images/team_rotate.png';
import border from '/images/hero_border.png';
import aboutShape from '/images/about_shape_3.png';
import serviceShape2 from '/images/tir.png';
import { FaFacebookF, FaLinkedinIn, FaXTwitter,} from 'react-icons/fa6';
import { GoShareAndroid } from 'react-icons/go';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslation } from '../../utils/translations';

const teamData = [
  {
    id: 1,
    teamThumb: teamThumb,
    teamTitle: 'Dr. VO DINH TUNG',
    teamShare: <GoShareAndroid />,
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    teamDesc: 'CEO',
    teamShape: teamShape,
    facebookUrl: 'https://www.facebook.com/profile.php?id=61571026593304',
    twitterUrl: 'https://twitter.com',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 2,
    teamThumb: teamThumb2,
    teamTitle: 'Dr. LE QUANG DUC',
    teamShare: <GoShareAndroid />,
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    teamDesc: 'Head of Engineering',
    teamShape: teamShape,
    facebookUrl: 'https://www.facebook.com/profile.php?id=61571026593304',
    twitterUrl: 'https://twitter.com',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 3,
    teamThumb: teamThumb3,
    teamTitle: 'Kim Do Kyong',
    teamShare: <GoShareAndroid />,
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    teamDesc: 'IT Expert',
    teamShape: teamShape,
    facebookUrl: 'https://www.facebook.com/profile.php?id=61571026593304',
    twitterUrl: 'https://twitter.com',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 4,
    teamThumb: teamThumb4,
    teamTitle: 'DANG DUC HUY',
    teamShare: <GoShareAndroid />,
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    teamDesc: 'Head of Sales',
    teamShape: teamShape,
    facebookUrl: 'https://www.facebook.com/profile.php?id=61571026593304',
    twitterUrl: 'https://twitter.com',
    linkedinUrl: 'https://www.linkedin.com',
  },
  {
    id: 5,
    teamThumb: teamThumb5,
    teamTitle: 'NGO DANG KHOA',
    teamShare: <GoShareAndroid />,
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    teamDesc: 'Sales Staff',
    teamShape: teamShape,
    facebookUrl: 'https://www.facebook.com/profile.php?id=61571026593304',
    twitterUrl: 'https://twitter.com',
    linkedinUrl: 'https://www.linkedin.com',
  },
];

const TeamMember = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  return (
    <section
      className='pt-28 pb-28 relative z-10 bg-[url(/images/team_bg.png)] bg-cover bg-center'
    >
      <div className='absolute -z-10 top-10 left-1/2 -translate-x-1/2'>
        <img
          src={circleShape}
          draggable='false'
          className='max-w-[inherit] w-[inherit]'
        />
      </div>
      <div className='Container'>
        <div className='text-center'>
          <h5 className='font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 dark:text-green-400 uppercase mb-3'>
            {t('team.sectionTitle')}
          </h5>
          <h1 className='font-FiraSans font-semibold text-HeadingColor-0 dark:text-white inline-block text-[16px] leading-[26px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[34px] lg:leading-[44px] xl:text-[40px] xl:leading-[50px] 2xl:text-[42px] 2xl:leading-[52px] relative pb-4'>
            {t('team.title')}
            <img
              src={border}
              draggable='false'
              className='absolute bottom-0 left-1/2 -translate-x-1/2'
            />
          </h1>
          <img
            src={aboutShape}
            draggable='false'
            className='absolute -z-10 top-32 right-10 xl:right-80  animate-dance3 hidden md:block'
          />

          <div className='absolute -z-10 top-36 left-[22%] hidden 2xl:block animate-rotate'>
            <img
              src={serviceShape2}
              draggable='false'
            />
          </div>
        </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-16">
          {teamData.map(
            ({
              id,
              teamThumb,
              teamTitle,
              teamShare,
              socialIcon,
              socialIcon2,
              socialIcon3,
              socialIcon4,
              teamDesc,
              facebookUrl,
              twitterUrl,
              linkedinUrl,
            }) => {
              return (
                <div key={id} className="h-full">
                  <TeamCard
                    teamThumb={teamThumb}
                    teamTitle={teamTitle}
                    teamShare={teamShare}
                    socialIcon={socialIcon}
                    socialIcon2={socialIcon2}
                    socialIcon3={socialIcon3}
                    socialIcon4={socialIcon4}
                    teamDesc={teamDesc}
                    teamShape={teamShape}
                    facebookUrl={facebookUrl}
                    twitterUrl={twitterUrl}
                    linkedinUrl={linkedinUrl}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamMember;
