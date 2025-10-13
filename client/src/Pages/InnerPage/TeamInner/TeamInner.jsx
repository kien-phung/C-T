import {
  FaArrowRightLong,
} from "react-icons/fa6";
import BreadCrumb from "../../../Shared/BreadCrumb/BreadCrumb";
import TeamMember from "./TeamMember/TeamMember";



const TeamInner = () => {
  return (
    <>
      <BreadCrumb
        breadCrumbTitle={'Thành Viên'}
        breadCrumbIcon={<FaArrowRightLong />}
        breadCrumbLink={'Thành Viên'}
        bgImage={'/images/solutions/team.jpg'}
      />
      <TeamMember />
    </>
  );
};

export default TeamInner;
