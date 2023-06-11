import React, { MouseEventHandler } from 'react';

interface AudioControlsProps {
  isPlaying: boolean;
  onPrevClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onNextClick: MouseEventHandler<HTMLButtonElement> | undefined;
  onPlayPauseClick(arg0: boolean): void;
}

const AudioControls: React.FC<AudioControlsProps> = (
  props: AudioControlsProps
) => {
  return (
    <div className='flex justify-between w-[75%] my-0 mx-[15px]'>
      <button
        type='button'
        className='prev'
        aria-label='Previous'
        onClick={props.onPrevClick}
      >
        Prev
      </button>
      {props.isPlaying ? (
        <button
          type='button'
          className='w-12'
          onClick={() => props.onPlayPauseClick(false)}
          aria-label='Pause'
        >
          Pause{' '}
        </button>
      ) : (
        <button
          type='button'
          className='w-12'
          onClick={() => props.onPlayPauseClick(true)}
          aria-label='Play'
        >
          Play
        </button>
      )}
      <button
        type='button'
        className='next'
        aria-label='Next'
        onClick={props.onNextClick}
      >
        Next
      </button>
    </div>
  );
};

export default AudioControls;
