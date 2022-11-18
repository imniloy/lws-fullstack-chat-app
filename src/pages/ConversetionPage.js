import React from 'react';
import Blank from '../components/ui/inbox/Blank';
import Navbar from './../components/ui/header/Navbar';
import SideBar from './../components/ui/inbox/SideBar';
import { useState } from 'react';
import Madal from '../components/ui/inbox/utils/Madal';

const ConversetionPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controller = () => setIsOpen((prevState) => !prevState);

  return (
    <div>
      <Navbar />

      {
        isOpen && <Madal controller={controller} />
      }
      <div className="max-w-7xl mx-auto -mt-1 ">
        <div className="min-w-full border rounded flex lg:grid lg:grid-cols-3">
          <SideBar controller={controller} />
          <div className="w-full lg:col-span-2 lg:block">
            <div className="w-full grid conversation-row-grid">
              <Blank />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversetionPage;
