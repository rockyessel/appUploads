// import React from 'react';

// interface Props {}

const AudioPlayer = () => {
  return (
    <div>
      <audio
        src='https://cloud.appwrite.io/v1/storage/buckets/sd32_Hj9i8e3U9/files/QhBCkbf3/view?project=as32fHHiuy9KLJ'
        preload='metadata'
      ></audio>
      <button>back 30</button>
      <button>play / pause</button>
      <button>forward 30</button>

      {/* current time */}

      <div>0:00</div>

      {/* Progress bar */}
      <label>
        <input title='progress bar' type='range' />
      </label>

      {/* durat */}
      <div>2:49</div>
    </div>
  );
};

export default AudioPlayer;
