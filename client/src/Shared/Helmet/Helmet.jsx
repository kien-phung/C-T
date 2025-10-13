/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

const HelmetChanger = ({ title }) => {
  return (
    <Helmet>
      <title>{title ? `Điện Tử C&T - ${title}` : 'Điện Tử C&T'}</title>
    </Helmet>
  );
};

export default HelmetChanger;
