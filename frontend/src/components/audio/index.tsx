import React from 'react';
import { motion } from 'framer-motion';
import { Metadata } from '../../interface';
import { CgMusicNote } from 'react-icons/cg';
import { VscPlay, VscDebugPause } from 'react-icons/vsc';
import * as jsmediatags from 'jsmediatags';
import { jsmediatagsError } from 'jsmediatags/types';

interface Props {
  value: string;
}

const AudioPlayer = (props: Props) => {
  const [metadata, setMetadata] = React.useState<Metadata | undefined>();
  const [audio, setAudio] = React.useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${props?.value}`);
        const data = await response.blob();

        jsmediatags.read(data, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (tags: { type: string; tags: any }) => {
            setMetadata(tags.tags);
          },
          onError: (error: jsmediatagsError) => {
            console.log(error);
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [props?.value]);

  React.useEffect(() => {
    const audio = new Audio(props?.value);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });
    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });
    setAudio(audio);
  }, [props?.value]);

  React.useEffect(() => {
    const audio = new Audio(props.value);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });
    setAudio(audio);
  }, [props.value]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${formattedSeconds}`;
  };

  const togglePlay = () => {
    if (isPlaying) {
      audio?.pause();
      setIsPlaying(false);
    } else {
      audio?.play();
      setIsPlaying(true);
    }
  };

  const isDataAvailable =
    metadata && metadata?.picture && metadata?.picture.data;
  const image =
    metadata &&
    metadata?.picture &&
    metadata?.picture.data &&
    `data:${metadata?.picture?.format};base64,${btoa(
      Array.from(metadata?.picture?.data)
        .map((byte) => String.fromCharCode(byte))
        .join('')
    )}`;

  const title = metadata && metadata.title;

  return isDataAvailable ? (
    <motion.div className='w-full bg-gray-50 h-[20rem] overflow-hidden rounded-lg flex items-center border-[1px] relative'>
      <img
        className='w-full h-full object-cover object-center'
        src={image}
        alt={title}
      />
      <motion.div className='md:absolute hidden md:block inset-0 backdrop-blur-[2px] top-56 bg-gradient-to-b from-transparent via-[#18202b]/90 to-[#18202b] group-hover:from-[#18202b]/[1] group-hover:via-[#18202b]/80 group-hover:to-[#18202b]/[1]'></motion.div>
      <motion.div className='absolute bottom-5 w-full flex flex-col items-center justify-center text-gray-50'>
        <motion.button
          title={isPlaying ? 'Pause' : 'Play'}
          onClick={togglePlay}
        >
          {isPlaying ? <VscDebugPause /> : <VscPlay />}
        </motion.button>
        <motion.div className='w-full flex items-center justify-around '>
          <motion.span>{formatTime(currentTime)}</motion.span>
          <label>
            <input title='Song' type='range' />
          </label>
          <motion.span>{formatTime(duration)}</motion.span>
        </motion.div>
      </motion.div>
    </motion.div>
  ) : (
    <div className='w-full bg-gray-50 h-[20rem] overflow-hidden rounded-lg flex items-center border-[1px] relative'>
      <CgMusicNote className='w-full text-[7rem]' />

      <motion.div className='md:absolute hidden md:block inset-0 backdrop-blur-[2px] top-56 bg-gradient-to-b from-transparent via-[#18202b]/90 to-[#18202b] group-hover:from-[#18202b]/[1] group-hover:via-[#18202b]/80 group-hover:to-[#18202b]/[1]'></motion.div>
      <motion.div className='absolute bottom-5 w-full flex flex-col items-center justify-center'>
        <motion.button
          title={isPlaying ? 'Pause' : 'Play'}
          onClick={togglePlay}
        >
          {isPlaying ? <VscDebugPause /> : <VscPlay />}
        </motion.button>
        <motion.div className='w-full flex items-center justify-center '>
          <motion.span>{formatTime(currentTime)}</motion.span> /
          <motion.span>{formatTime(duration)}</motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AudioPlayer;
