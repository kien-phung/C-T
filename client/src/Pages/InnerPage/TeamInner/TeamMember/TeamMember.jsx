import teamThumb from "/images/members/ceo.png";
import teamThumb2 from "/images/members/engineer.png";
import teamThumb3 from "/images/members/it.png";
import teamThumb4 from "/images/members/sales.png";
import teamThumb5 from "/images/members/staff.png";
import TeamCard from "./TeamCard";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";

const teamData = [
  {
    id: 1,
    teamThumb: teamThumb,
    teamTitle: "Dr. Vo Dinh Tung",
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    socialIcon4: <FaPinterestP />,
    teamDesc: "CEO",
  },
  {
    id: 2,
    teamThumb: teamThumb3,
    teamTitle: "Dr. Le Quang Duc",
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    socialIcon4: <FaPinterestP />,
    teamDesc: "Head of Engineering",
  },
  {
    id: 3,
    teamThumb: teamThumb2,
    teamTitle: "Kim Do Kyong",
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    socialIcon4: <FaPinterestP />,
    teamDesc: "IT Expert",
  },  {
    id: 4,
    teamThumb: teamThumb4,
    teamTitle: "Dang Duc Huy",
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    socialIcon4: <FaPinterestP />,
    teamDesc: "Head of Sales",
  },
  {
    id: 5,
    teamThumb: teamThumb5,
    teamTitle: "Ngo Dang Khoa",
    socialIcon: <FaFacebookF />,
    socialIcon2: <FaXTwitter />,
    socialIcon3: <FaLinkedinIn />,
    socialIcon4: <FaPinterestP />,
    teamDesc: "Sales Staff",
  },
];

const TeamMember = () => {
  return (
    <section className="py-28 relative">
      <div className="Container">
        <div className="text-center">
          <h5 className="font-FiraSans font-medium text-sm sm:text-base text-PrimaryColor-0 uppercase flex items-center justify-center gap-2 mb-3">
            MEET OUR TEAM
          </h5>
          <h1 className="font-FiraSans font-semibold text-HeadingColor-0 text-[16px] leading-[26px] sm:text-[25px] sm:leading-[35px] md:text-[30px] md:leading-[40px] lg:text-[38px] lg:leading-[48px] xl:text-[42px] xl:leading-[52px]">
            {`We’ve`} 36+ Active & Dedicated Members
            <br />
            for Helping the Customers
          </h1>
          <p className="font-FiraSans text-TextColor2-0 pt-4">
            Globally engage cross-media leadership skills before cross-media
            innovation forward
            <br className="hidden md:block" /> develope standardized platforms
            without robust
          </p>
        </div>
        {/* All 5 members in uniform layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-[58px]">
          {teamData.map(
            ({
              id,
              teamThumb,
              teamTitle,
              socialIcon,
              socialIcon2,
              socialIcon3,
              socialIcon4,
              teamDesc,
            }) => {
              return (
                <div key={id} className="h-full">
                  <TeamCard
                    teamThumb={teamThumb}
                    teamTitle={teamTitle}
                    socialIcon={socialIcon}
                    socialIcon2={socialIcon2}
                    socialIcon3={socialIcon3}
                    socialIcon4={socialIcon4}
                    teamDesc={teamDesc}
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
