import CountUp from "react-countup";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { useLanguage } from '../../../../contexts/LanguageContext';
import { getTranslation } from '../../../../utils/translations';

const Counter = () => {
  const { currentLanguage } = useLanguage();
  const t = (key) => getTranslation(currentLanguage, key);

  return (
    <section className="py-20 bg-BodyBg4-0">
      <div className="Container">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-7 py-[56px] px-8">
            <div>
              <CountUp
                start={-11}
                end={5}
                suffix={"K+"}
                className="font-FiraSans text-3xl leading-[22px] sm:text-[50px] sm:leading-[42px] xl:text-[60px] xl:leading-[52px] text-HeadingColor-0 dark:text-white font-medium"
              />
            </div>
            <p className="font-FiraSans text-lg text-TextColor2-0 dark:text-gray-300 capitalize">
              {t('counter.completedWorks')} <br /> {t('counter.withSatisfaction')}
            </p>
          </div>
          <div className="relative bg-PrimaryColor-0 dark:bg-green-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-7 py-[56px] px-8">
            <div>
              <CountUp
                start={-11}
                prefix="4."
                end={98}
                suffix={""}
                className="font-FiraSans text-3xl leading-[22px] sm:text-[50px] sm:leading-[42px] xl:text-[60px] xl:leading-[52px] text-white font-medium"
              />
            </div>
            <div>
              <ul className="flex items-center gap-1">
                <li className="text-[#ffb609]">
                  <FaStar size={"18"} />
                </li>
                <li className="text-[#ffb609]">
                  <FaStar size={"18"} />
                </li>
                <li className="text-[#ffb609]">
                  <FaStar size={"18"} />
                </li>
                <li className="text-[#ffb609]">
                  <FaStar size={"18"} />
                </li>
                <li className="text-[#ffb609]">
                  <FaStarHalfAlt size={"18"} />
                </li>
              </ul>
              <p className="font-FiraSans text-lg text-white capitalize mt-2">
                {t('counter.avgClientsRatings')}
              </p>
            </div>
          </div>
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-7 py-[56px] px-8">
            <div>
              <CountUp
                start={-11}
                end={99}
                suffix={"%"}
                className="font-FiraSans text-3xl leading-[22px] sm:text-[50px] sm:leading-[42px] xl:text-[60px] xl:leading-[52px] text-HeadingColor-0 dark:text-white font-medium"
              />
            </div>
            <p className="font-FiraSans text-lg text-TextColor2-0 dark:text-gray-300 capitalize">
              {t('counter.trackAnalyze')} <br /> {t('counter.businessReports')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Counter;
