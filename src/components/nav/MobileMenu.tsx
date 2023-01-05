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
        openMenu ? "flex" : "hidden"
      } h-screen flex-col items-center justify-start`}
      onClick={() => setOpenMenu(!openMenu)}
    >
      <div className="h-[calc(100vh-50px-3rem)] w-[calc(100vw-50px)] rounded-lg bg-slate-200 p-4 shadow-lg">
        <NavMenu isMobile={true} />
      </div>
    </div>
  );
};

export default MobileMenu;
