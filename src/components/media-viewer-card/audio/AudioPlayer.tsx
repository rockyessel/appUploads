/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import { Metadata, UserDocumentProps } from '../../../interface';
import { fetchAudioData } from '../../../utils/functions';
import { AiFillBackward, AiFillForward } from 'react-icons/ai';
import { MdOutlineLoop, MdReplay } from 'react-icons/md';

interface Props {
  documentData: UserDocumentProps;
}

const AudioPlayer = (props: Props) => {
  // Initialize state variables
  const [isPlaying, setIsPlaying] = React.useState(false); // Indicates whether the audio is currently playing or not
  const [duration, setDuration] = React.useState(0); // Stores the duration of the audio in seconds
  const [currentTime, setCurrentTime] = React.useState(0); // Stores the current playback time of the audio in seconds

  const [metadata, setMetadata] = React.useState<Metadata | undefined>(); // Stores the metadata of the audio

  console.log('Metadata', metadata); // Log the metadata object to the console

  // Fetch audio data and update the metadata when the 'view' prop changes
  React.useEffect(() => {
    fetchAudioData(`${props?.documentData?.view}`, setMetadata);
  }, [props?.documentData?.view]);

  // Calculate the image URL from the metadata
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

  // Create references to the audio player, progress bar, and animation frame
  const audioPlayer = React.useRef<HTMLAudioElement>(null);
  const progressBar = React.useRef<HTMLInputElement>(null);
  const animationRef = React.useRef<number>(0);

  // Toggle play/pause of the audio
  const togglePlayPause = () => {
    const prevState = !isPlaying;
    setIsPlaying(prevState);

    if (prevState) {
      if (audioPlayer.current && currentTime === duration) {
        audioPlayer.current.currentTime = 0; // If the audio has finished playing, restart it
      }
      audioPlayer.current?.play(); // Play the audio
      animationRef.current = requestAnimationFrame(whilePlaying); // Start the animation loop
    } else {
      audioPlayer.current?.pause(); // Pause the audio
      cancelAnimationFrame(animationRef.current); // Cancel the animation frame
    }
  };

  // Update the duration and current time when audio metadata is loaded
  React.useEffect(() => {
    const audioDurationInSeconds = Math.floor(
      audioPlayer.current?.duration || 0
    ); // Calculate audio duration in seconds
    const audioCurrentTimeInSeconds = Math.floor(
      audioPlayer.current?.currentTime || 0
    ); // Calculate current playback time in seconds
    setCurrentTime(audioCurrentTimeInSeconds); // Update the current time state
    setDuration(audioDurationInSeconds); // Update the duration state
    progressBar.current?.setAttribute('max', audioDurationInSeconds.toString()); // Set the max value of the progress bar

    if (currentTime === duration) {
      // If the audio has finished playing
      audioPlayer.current?.pause();
      setIsPlaying(false); // Pause the audio and set isPlaying state to false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  // Calculate the formatted audio duration string
  const calculateAudioDuration = (seconds: number) => {
    const second = 60;
    const oneMinute = 1 * second;
    const minuteCalculation = Math.floor(seconds / oneMinute); // Calculate the minutes
    const secondCalculation = Math.floor(seconds % second); // Calculate the seconds
    const returnedMinutes =
      minuteCalculation < 10 ? `0${minuteCalculation}` : `${minuteCalculation}`; // Format minutes as "01" to "09" if less than 10
    const returnedSeconds =
      second < 10 ? `0${secondCalculation}` : `${secondCalculation}`; // Format seconds as "01" to "09" if less than 10

    return `${returnedMinutes}:${returnedSeconds}`; // Return the formatted duration string
  };

  // Update the progress bar and current time while playing
  const whilePlaying = () => {
    progressBar.current!.value = String(audioPlayer.current?.currentTime); // Update the progress bar value
    changePlayerCurrentTime(); // Update the current time display
    animationRef.current = requestAnimationFrame(whilePlaying); // Request the next animation frame
  };

  // Change the audio playback position based on the progress bar value
  const changeRange = () => {
    audioPlayer!.current!.currentTime = Number(progressBar.current?.value); // Update the current time of the audio
    if (audioPlayer.current && currentTime === duration) {
      audioPlayer.current.currentTime = 0; // If the audio has finished playing, restart it
    }
    changePlayerCurrentTime(); // Update the current time display
  };

  // Update the progress bar width and current time display
  const changePlayerCurrentTime = () => {
    progressBar.current?.style.setProperty(
      '--seek-before-width',
      `${(Number(progressBar.current?.value) / duration) * 100}%`
    ); // Update the progress bar width based on the current time
    setCurrentTime(Number(progressBar.current?.value)); // Update the current time state
  };

  // Handle skipping forward or backward in the audio playback
  const handleTimeSkip = (type: 'forward' | 'backward') => {
    if (type === 'forward') {
      progressBar.current!.value = String(
        Number(progressBar.current!.value) + 30
      ); // Increase the progress bar value by 30 seconds
      changeRange(); // Change the audio playback position
    } else if (type === 'backward') {
      progressBar.current!.value = String(
        Number(progressBar.current!.value) - 30
      ); // Decrease the progress bar value by 30 seconds
      changeRange(); // Change the audio playback position
    }
  };

  // Restart the audio playback from the beginning
  const handleRestartAudio = () => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = 0; // Set the current time of the audio to 0
      setIsPlaying((prevState) => !prevState); // Toggle the isPlaying state to trigger play/pause button update
    }
  };

  console.log('currentTime', currentTime); // Log the current time to the console
  console.log('duration', duration); // Log the duration to the console
  console.log('isPlaying', isPlaying); // Log the isPlaying state to the console

  // Styles for the audio player container with a background image
  const styles = {
    width: '100%',
    backgroundImage: `url('${image}')`,
    backgroundColor: 'rgba(255,255,255,0.5)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  const startAudio = calculateAudioDuration(currentTime); // Calculate the formatted start audio duration string
  console.log('startAudio,', startAudio); // Log the start audio duration to the console
  console.log('currentTime,', currentTime); // Log the current time to the console

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

            <div className='w-full flex items-center justify-center relative'>
              <audio
                ref={audioPlayer}
                src={props.documentData.view}
                preload='metadata'
              ></audio>

              <button
                onClick={handleAudioLoop}
                className={`${
                  isLooped && 'bg-[rgba(255,255,255,0.4)] rounded-full'
                } p-1`}
              >
                <MdOutlineLoop className='text-3xl' />
                {/* Button to loop */}
              </button>

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
                      <FaPlay className='text-4xl p-1' />
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

              <button onClick={handleRestartAudio}>
                <MdReplay className='text-3xl' />
                {/* Button to restart */}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
