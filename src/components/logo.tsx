import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Props {
  size: string;
}

const Logo = (props: Props) => {
  return (
    <Link to='/'>
      <motion.span className={`text-rose-800 ${props.size}`}>
        app
        <motion.span className='font-extrabold underline text-rose-700 underline-offset-4'>
          Uploads
        </motion.span>
        .
      </motion.span>
    </Link>
  );
};

export default Logo;
