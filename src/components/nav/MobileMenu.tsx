import React from "react";

import NavMenu from "./NavMenu";

interface Props {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<Props> = ({ openMenu, setOpenMenu }) => {
  return (
    <div
      className={`${
        openMenu ? "flex bg-slate-700 bg-opacity-25" : "hidden"
      } h-screen flex-col items-start justify-start absolute w-screen mr-auto z-10 transition duration-600`}
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div className="h-[100vh] min-w-fit bg-slate-200 p-4 shadow-lg animate-SlideIn">
        <NavMenu isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenu;
