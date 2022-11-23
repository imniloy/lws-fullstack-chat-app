import React from "react";
import Blank from "../components/ui/inbox/Blank";
import Navbar from "./../components/ui/header/Navbar";
import SideBar from "./../components/ui/inbox/SideBar";

const ConversetionPage = () => {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto -mt-1 ">
        <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
          <SideBar />
          <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
              <Blank />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversetionPage;
