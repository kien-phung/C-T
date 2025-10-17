import { FaArrowRightLong } from "react-icons/fa6";
import BreadCrumb from "../../../Shared/BreadCrumb/BreadCrumb";
import TeamMember from "../../../Component1/TeamMember/TeamMember";
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';

const TeamInner = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={t('nav.team')}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={t('nav.team')}
        bgImage={'/images/solutions/team.jpg'}
      />
      <TeamMember />
    </>
  );
};

export default TeamInner;
