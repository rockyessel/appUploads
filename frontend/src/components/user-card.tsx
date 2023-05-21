import React from 'react';
import { motion } from 'framer-motion';
import { useAppwriteContext } from '../context/app-write';

// interface Props {}

const UserCard = () => {
  const { getUser } = useAppwriteContext();
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState<unknown>({});

  const getUserInfo = React.useCallback(async () => {
    setLoading(true);
    const user_ = await getUser();
    setUser(user_);
    setLoading(false);
  }, [getUser]);

  console.log('user', user);
  console.log('loading', loading);

  React.useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <motion.div className='relative w-10 h-10 bg-red-500 rounded-full'></motion.div>
  );
};

export default UserCard;
