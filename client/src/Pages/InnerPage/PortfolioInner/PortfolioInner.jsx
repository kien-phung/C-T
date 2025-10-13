import { FaArrowRightLong } from "react-icons/fa6";
import BreadCrumb from "../../../Shared/BreadCrumb/BreadCrumb";
import Portfolio from "./Portfolio/Portfolio";

const PortfolioInner = () => {
  return (
    <>
      <BreadCrumb
        breadCrumbTitle={"Dự Án"}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={"Dự Án"}
      />
      <Portfolio />
    </>
  );
};

export default PortfolioInner;
