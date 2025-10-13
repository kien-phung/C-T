import { FaArrowRightLong } from 'react-icons/fa6';
import BreadCrumb from '../../../Shared/BreadCrumb/BreadCrumb';
import Contact from './Contact';
import Map from './Map';

const ContactInner = () => {
  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Liên Hệ'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Liên Hệ'}
        bgImage={'/images/solutions/contact.jpg'}
      />
      <Contact />
      <Map />
    </>
  );
};

export default ContactInner;
