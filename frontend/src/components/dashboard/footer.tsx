import React from 'react';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';

const DashboardFooter = () => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  const formattedDateTime = format(
    currentDateTime,
    "do MMMM, yyyy HH:mm 'hrs'",
    { locale: enGB }
  );

  const router = window.location.pathname.split('/').pop();

  const section = router === 'dashboard' ? 'Main' : router;

  return (
    <div className=' hidden px-3 text-sm lg:inline-flex items-center text-gray-50/60 gap-10 bottom-0 border-t-[1px] bg-[rgb(255,255,255,0.2)]  backdrop-blur-md sticky w-full h-10'>
      <span>{formattedDateTime}</span>
      {/* <span>Time: 4:42 AM </span> */}
      <span className='capitalize'> Section: {section}</span>
      <span className=''> Total file: 32</span>
      <span className=''> Total size: 1 GB</span>
      <div className='form-control w-52'>
        <label className='cursor-pointer label'>
          <span className='text-white'>Remember me</span>
          <input type='checkbox' className='toggle toggle-accent' />
        </label>
      </div>
    </div>
  );
};

export default DashboardFooter;
