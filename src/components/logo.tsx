// import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../assets/dnest.svg';

// interface Props {
//   size: string;
// }

const Logo = () => {
  return (
    <Link className='flex items-center gap-0' to='/'>
      <img className='w-10' src={logo} alt='' /> <span className='text-3xl font-bold'>nest</span>
    </Link>
  );
};

export default Logo;
