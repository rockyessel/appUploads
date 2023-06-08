import React from 'react';
import { CiCircleMore } from 'react-icons/ci';
import { RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { VscDebugPause, VscPlay } from 'react-icons/vsc';
import { formatTime } from '../../../utils/functions';
import { UserDocumentProps } from '../../../interface';

interface Props {
  audioData: {
    image: string | undefined;
    title: string | undefined;
  };
  documentData: UserDocumentProps;
}

const MainAudioCard = (props: Props) => {
  const [clicked, setClicked] = React.useState(false);
  // const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  // const [isPlaying, setIsPlaying] = React.useState(false);
  // const [duration, setDuration] = React.useState(0);
  // const [currentTime, setCurrentTime] = React.useState(0);

  // React.useEffect(() => {
  //   const audio = new Audio(props?.documentData?.view);
  //   audio.addEventListener('loadedmetadata', () => {
  //     setDuration(audio.duration);
  //   });
  //   audio.addEventListener('timeupdate', () => {
  //     setCurrentTime(audio.currentTime);
  //   });
  //   audio.addEventListener('ended', () => {
  //     setIsPlaying(false);
  //     setCurrentTime(0);
  //   });
  //   setAudio(audio);
  // }, [props?.documentData?.view]);

  // React.useEffect(() => {
  //   const audio = new Audio(props?.documentData?.view);
  //   audio.addEventListener('loadedmetadata', () => {
  //     setDuration(audio.duration);
  //   });
  //   setAudio(audio);
  // }, [props?.documentData?.view]);

  // const togglePlay = () => {
  //   if (isPlaying) {
  //     audio?.pause();
  //     setIsPlaying(false);
  //   } else {
  //     audio?.play();
  //     setIsPlaying(true);
  //   }
  // };

  return (
    <motion.div className='relative flex-col rounded-lg bg-[rgb(255,255,255,0.1)] backdrop-blur-lg  border-[1px] border-gray-300 gap-4 w-40 h-32 inline-flex items-center justify-center'>
      <img
        className='w-full h-full object-cover object-center rounded-lg'
        src={props?.audioData?.image}
        alt={props?.audioData?.title}
      />
      <span className='absolute top-1 right-1 inline-flex items-center justify-center rounded-lg text-sm p-1'>
        <span
          className='z-20 bg-[rgb(255,255,255,0.5)] backdrop-blur-lg text-gray-50/70 border-[1px] p-1 rounded-lg'
          onClick={() => setClicked((prev) => !prev)}
        >
          {clicked ? (
            <RiCloseLine className='text-xl' />
          ) : (
            <CiCircleMore className='text-xl' />
          )}
        </span>
        {clicked && (
          <span className='top-0 border-[1px] border-gray-300 w-40 right-0 h-32 flex flex-col gap-2 p-2 rounded-lg z-10 absolute bg-transparent'>
            <Link
              to={`/dashboard/music/${props?.documentData?.$id}`}
              className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'
            >
              <span>View</span>
            </Link>
            <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
              Share
            </span>
            <span className='w-full hover:bg-white border-[1px] border-transparent hover:border-[1px] hover:border-gray-300 px-2 py-1 rounded-lg'>
              Delete
            </span>
          </span>
        )}
      </span>

      <motion.div className='md:absolute hidden md:block inset-0 backdrop-blur-[2px] top-56 bg-gradient-to-b from-transparent via-[#18202b]/90 to-[#18202b] group-hover:from-[#18202b]/[1] group-hover:via-[#18202b]/80 group-hover:to-[#18202b]/[1]'></motion.div>
      <motion.div className='absolute bottom-1 w-full flex flex-col items-center justify-center text-gray-50'>
        {/* <motion.div className='w-full flex items-center justify-around '>
          <motion.span>{formatTime(currentTime)}</motion.span>
          <motion.span
            title={isPlaying ? 'Pause' : 'Play'}
            onClick={togglePlay}
          >
            {isPlaying ? <VscDebugPause /> : <VscPlay />}
          </motion.span>
          <motion.span>{formatTime(duration)}</motion.span>
        </motion.div> */}
      </motion.div>

      <span className='absolute bottom-1 rounded-lg text-sm px-2 py-1 bg-[rgb(255,255,255,0.5)] backdrop-blur-lg'>
        {props?.audioData?.title
          ?.slice(0, 12)
          .concat(`...${props?.documentData?.extension}`)}
      </span>
    </motion.div>
  );
};

export default MainAudioCard;
