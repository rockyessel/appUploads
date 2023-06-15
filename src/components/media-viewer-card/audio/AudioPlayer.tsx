/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Metadata, UserDocumentProps } from '../../../interface';
import { fetchAudioData } from '../../../utils/functions';
import { AiFillBackward, AiFillForward } from 'react-icons/ai';
import { MdReplay } from 'react-icons/md';

interface Props {
  documentData: UserDocumentProps;
}

const AudioPlayer = (props: Props) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);
  // Define state variable to store the audio metadata
  const [metadata, setMetadata] = React.useState<Metadata | undefined>();

  console.log('Metadata', metadata);

  // Fetch audio data and update the metadata when the 'view' prop changes
  React.useEffect(() => {
    fetchAudioData(`${props?.documentData?.view}`, setMetadata);
  }, [props?.documentData?.view]);

  // Check if the audio data is available
  // const isDataAvailable =
  //   metadata && metadata?.picture && metadata?.picture.data;

  // Extract the image data from the metadata
  const image =
    metadata &&
    metadata?.picture &&
    metadata?.picture.data &&
    `data:${metadata?.picture?.format};base64,${btoa(
      Array.from(metadata?.picture?.data)
        .map((byte) => String.fromCharCode(byte))
        .join('')
    )}`;

  // Extract the title from the metadata
  const title = metadata && metadata.title;

  // references
  const audioPlayer = React.useRef<HTMLAudioElement>(null); // reference to the audio player
  const progressBar = React.useRef<HTMLInputElement>(null); // reference to the progress `bar`
  const animationRef = React.useRef<number>(0); // reference to the animation frame

  const togglePlayPause = () => {
    const prevState = !isPlaying;
    setIsPlaying(prevState);

    if (prevState) {
      audioPlayer.current?.play(); // play the audio
      animationRef.current = requestAnimationFrame(whilePlaying); // start the animation loop
    } else {
      audioPlayer.current?.pause(); // pause the audio
      cancelAnimationFrame(animationRef.current); // cancel the animation frame
    }
  };

  // Update the duration and current time when audio metadata is loaded
  React.useEffect(() => {
    const audioDurationInSeconds = Math.floor(
      audioPlayer.current?.duration || 0
    ); // calculate audio duration in seconds
    const audioCurrentTimeInSeconds = Math.floor(
      audioPlayer.current?.currentTime || 0
    ); // calculate current playback time in seconds
    setCurrentTime(audioCurrentTimeInSeconds); // update the current time state
    setDuration(audioDurationInSeconds); // update the duration state
    progressBar.current?.setAttribute('max', audioDurationInSeconds.toString()); // set the max value of the progress bar
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  // Calculate the formatted audio duration string
  const calculateAudioDuration = (seconds: number) => {
    const second = 60;
    const oneMinute = 1 * second;
    const minuteCalculation = Math.floor(seconds / oneMinute); // calculate the minutes
    const secondCalculation = Math.floor(seconds % second); // calculate the seconds
    const returnedMinutes =
      minuteCalculation < 10 ? `0${minuteCalculation}` : `${minuteCalculation}`; // format minutes as "01" to "09" if less than 10
    const returnedSeconds =
      second < 10 ? `0${secondCalculation}` : `${secondCalculation}`; // format seconds as "01" to "09" if less than 10

    return `${returnedMinutes}:${returnedSeconds}`; // return formatted duration string
  };

  // Update the progress bar and current time while playing
  const whilePlaying = () => {
    progressBar.current!.value = String(audioPlayer.current?.currentTime); // update the progress bar value with current playback time
    changePlayerCurrentTime(); // update the current time state
    animationRef.current = requestAnimationFrame(whilePlaying); // request the next animation frame
  };

  // Change the current playback time based on the progress bar value
  const changeRange = () => {
    audioPlayer!.current!.currentTime = Number(progressBar.current?.value); // update the current playback time based on the progress bar value
    changePlayerCurrentTime(); // update the current time state
  };

  // Update the progress bar width and current time state
  const changePlayerCurrentTime = () => {
    progressBar.current?.style.setProperty(
      '--seek-before-width',
      `${(Number(progressBar.current?.value) / duration) * 100}%`
    ); // update the CSS variable to change the width of the progress bar
    setCurrentTime(Number(progressBar.current?.value)); // update the current time state
  };

  // Handle skipping forward or backward in time
  const handleTimeSkip = (type: 'forward' | 'backward') => {
    if (type === 'forward') {
      progressBar.current!.value = String(
        Number(progressBar.current!.value) + 30
      ); // skip 30 seconds forward
      changeRange(); // update the current playback time
    } else if (type === 'backward') {
      progressBar.current!.value = String(
        Number(progressBar.current!.value) - 30
      ); // skip 30 seconds backward
      changeRange(); // update the current playback time
    }
  };

  console.log('currentTime', currentTime);
  console.log('duration', duration);
  console.log('isPlaying', isPlaying);

  const styles = {
    width: '100%',
    backgroundImage: `url('${image}')`,
    backgroundColor: 'rgba(255,255,255,0.5)',
  };

  const startAudio = calculateAudioDuration(currentTime);
  console.log('startAudio,', startAudio);

  return (
    <div className='w-full h-[30rem] bg-[rgba(255,255,255,0.5)]' style={styles}>
      <div className='flex flex-col items-start justify-end w-full h-full dark:bg-[rgba(34,34,34,0.8)] bg-[rgba(255,255,255,0.7)] backdrop-blur-lg'>
        <div className='w-full flex'>
          <div className='w-[15rem] h-[15rem] bg-black'>
            <img
              className='w-full object-cover object-center'
              src={image}
              alt=''
            />
          </div>
          <div className='dark:text-white'>
            <p>Title: {title}</p>
            <p>Genre: {metadata?.genre}</p>
            <p>Artist: {metadata?.artist}</p>
            <p>Year: {metadata?.year}</p>
          </div>
        </div>
        <div
          className={
            'w-full h-16 flex items-center text-white  backdrop-blur-lg p-3'
          }
        >
          <div className='w-full flex flex-col gap-0'>
            <div className='w-full flex items-center'>
              {/* Current time display */}
              <div className={''}>
                {currentTime && !isNaN(currentTime) && startAudio}
              </div>

              {/* Progress bar */}
              <div className={'relative w-full inline-flex items-center'}>
                <input
                  title='progress bar'
                  type='range'
                  defaultValue='0:00'
                  className={'progressBar'}
                  ref={progressBar}
                  onChange={changeRange}
                />{' '}
                {/* Input range element for the progress bar */}
              </div>

              {/* Duration display */}
              <div className={'inline-flex items-center'}>
                {duration &&
                  !isNaN(duration) &&
                  calculateAudioDuration(duration)}
              </div>
            </div>

            <div className='w-full flex items-center justify-center'>
              <audio
                ref={audioPlayer}
                src={props.documentData.view}
                preload='metadata'
              ></audio>

              <button
                onClick={() => handleTimeSkip('backward')}
                className={'forwardBackward'}
              >
                <AiFillBackward className='text-3xl' />{' '}
                {/* Button to skip 30 seconds backward */}
              </button>

              <div className='border-player p-2 flex items-center justify-center rounded-full'>
                <button
                  className={
                    'module-border-wrap inline-flex items-center justify-center p-[3px]'
                  }
                  onClick={togglePlayPause}
                >
                  {isPlaying ? (
                    <span className={'bg-slate-900 p-2 rounded-full'}>
                      <FaPause className='text-4xl p-1' />
                    </span>
                  ) : (
                    <span className={'bg-slate-900 p-2 rounded-full'}>
                      <FaPlay className='text-4xll p-1' />
                    </span>
                  )}
                  {/* Button to toggle play/pause based on the current playback state */}
                </button>
              </div>

              <button
                onClick={() => handleTimeSkip('forward')}
                className={'forwardBackward'}
              >
                <AiFillForward className='text-3xl' />
                {/* Button to skip 30 seconds forward */}
              </button>

              <button>
                <MdReplay className='text-3xl' />
                {/* Button to skip 30 seconds forward */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
