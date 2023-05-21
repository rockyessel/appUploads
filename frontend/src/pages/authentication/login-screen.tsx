import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideAnimation } from '../../utils/motion';
import { screenState } from '../../utils/state';
import { useSnapshot } from 'valtio';
import { useAppwriteContext } from '../../context/app-write';
import { AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [selectActiveTab, setSelectActiveTab] = React.useState('login');
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [loading, setLoading] = React.useState(false);
  const snap = useSnapshot(screenState);
  const { login } = useAppwriteContext();

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setForm((prevFormData) => ({
      ...prevFormData,
      [target.name]: target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmission = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      console.log('form', form);
      setLoading(true);
      await login(form);
      navigate('/dashboard');
      setLoading(false);
      console.log('Done');
    } catch (error) {
      console.log('error', error);
    } finally {
      console.log('Finally Done');
      setForm({ email: '', password: '' });
    }
  };

  if (loading) return <p>Loading</p>;
  return (
    <AnimatePresence>
      {snap.authenticationScreen.login && (
        <motion.section
          {...slideAnimation('up')}
          className='w-full bg-white absolute top-0 left-0 z-[6] flex items-center justify-center'
        >
          <motion.div className='flex flex-col gap-10 items-center justify-center w-[40rem] min-h-screen'>
            <motion.div className='w-full flex flex-col gap-4'>
              <motion.ul className='tabs text-medium'>
                <motion.li
                  onClick={() => {
                    screenState.authenticationScreen.register = true;
                    screenState.authenticationScreen.login = false;
                    setSelectActiveTab('register');
                  }}
                  className={`tab tab-lifted ${
                    selectActiveTab === 'register' && 'tab-active text-bold'
                  }`}
                >
                  Register
                </motion.li>
                <motion.li
                  onClick={() => {
                    screenState.authenticationScreen.register = false;
                    screenState.authenticationScreen.login = true;
                    setSelectActiveTab('login');
                  }}
                  className={`tab tab-lifted ${
                    selectActiveTab === 'login' && 'tab-active text-bold'
                  }`}
                >
                  Login
                </motion.li>
              </motion.ul>
            </motion.div>

            <form
              onSubmit={handleSubmission}
              className='w-full flex flex-col gap-5'
            >
              <div className='w-full'>
                <label>Email</label>
                <input
                  value={form.email}
                  onChange={handleFormChange}
                  type='email'
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='name@company.com'
                />
              </div>

              <div className='w-full'>
                <label>Password</label>
                <input
                  value={form.password}
                  onChange={handleFormChange}
                  type='password'
                  name='password'
                  id='password'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='name@company.com'
                />
              </div>

              <div>
                <button
                  title='Login'
                  type='submit'
                  className='inline-flex items-center gap-2 border-[1px] rounded-lg px-4 py-2'
                >
                  Login <AiOutlinePlus />
                </button>
              </div>
            </form>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default LoginScreen;
