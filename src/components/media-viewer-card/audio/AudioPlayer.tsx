/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { FaPlay, FaPause } from 'react-icons/fa';
import { UserDocumentProps } from '../../../interface';

interface Props {
  documentData: UserDocumentProps;
}

const AudioPlayer = (props: Props) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

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

  const whilePlaying = () => {
    progressBar.current!.value = String(audioPlayer.current?.currentTime); // update the progress bar value with current playback time
    changePlayerCurrentTime(); // update the current time state
    animationRef.current = requestAnimationFrame(whilePlaying); // request the next animation frame
  };

  const changeRange = () => {
    audioPlayer!.current!.currentTime = Number(progressBar.current?.value); // update the current playback time based on the progress bar value
    changePlayerCurrentTime(); // update the current time state
  };

  const changePlayerCurrentTime = () => {
    progressBar.current?.style.setProperty(
      '--seek-before-width',
      `${(Number(progressBar.current?.value) / duration) * 100}%`
    ); // update the CSS variable to change the width of the progress bar
    setCurrentTime(Number(progressBar.current?.value)); // update the current time state
  };

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

  return (
    <div className={'audioPlayer'}>
      {/* Audio element with the source and preload attribute */}
      <audio
        ref={audioPlayer}
        src={props.documentData.view}
        preload='metadata'
      ></audio>

      <button
        onClick={() => handleTimeSkip('backward')}
        className={'forwardBackward'}
      >
        <BsArrowLeftShort /> 30 {/* Button to skip 30 seconds backward */}
      </button>

      <button className={'playPause'} onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay className={'play'} />}
        {/* Button to toggle play/pause based on the current playback state */}
      </button>

      <button
        onClick={() => handleTimeSkip('forward')}
        className={'forwardBackward'}
      >
        <BsArrowRightShort /> 30 {/* Button to skip 30 seconds forward */}
      </button>

      {/* Current time display */}
      <div className={'currentTime'}>
        {currentTime &&
          !isNaN(currentTime) &&
          calculateAudioDuration(currentTime)}
      </div>

      {/* Progress bar */}
      <div className={'progressBarWrapper'}>
        <input
          title='progress bar'
          type='range'
          defaultValue='0'
          className={'progressBar'}
          ref={progressBar}
          onChange={changeRange}
        />{' '}
        {/* Input range element for the progress bar */}
      </div>

      {/* Duration display */}
      <div className={'duration'}>
        {duration && !isNaN(duration) && calculateAudioDuration(duration)}
      </div>
    </div>
  );
};

export default AudioPlayer;
