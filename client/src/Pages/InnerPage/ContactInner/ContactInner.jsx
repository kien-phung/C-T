import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import Contact from './Contact';
import Map from './Map';
import { useLanguage } from '../../../contexts/LanguageContext';
import { getTranslation } from '../../../utils/translations';

const ContactInner = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  return (
    <>
      <BreadCrumb
        breadCrumbTitle={t('nav.contact')}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={t('nav.contact')}
        bgImage={'/images/solutions/contact.jpg'}
      />
      <Contact />
      <Map />
    </>
  );
};

export default ContactInner;
