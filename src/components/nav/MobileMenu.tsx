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
        openMenu ? "flex bg-slate-800 bg-opacity-50" : "hidden"
      } h-screen flex-col items-center justify-start absolute w-full pt-[4.5rem] mx-auto z-10`}
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div className="h-[calc(100vh-50px-3rem)] w-[calc(100vw-50px)] rounded-lg bg-slate-200 p-4 shadow-lg animate-SlideIn">
        <NavMenu isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenu;
