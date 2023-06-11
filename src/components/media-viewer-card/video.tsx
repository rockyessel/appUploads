import { useRef } from 'react';
import Plyr, { APITypes } from 'plyr-react';
import 'plyr-react/plyr.css';

interface Props {
  url?: string;
}

const PlyrVideoCard = (props: Props) => {
  const videoId = 'yWtFb9LJs3o';
  const provider = 'youtube';
  const videoOptions = undefined;

  const ref = useRef<APITypes>(null);

  //   const enterVideo = () => {
  //     (ref.current?.plyr as Plyr)?.fullscreen.enter();
  //   };

  //   const make2x = () => {
  //     const plyrInstance = ref.current?.plyr as Plyr;
  //     if (plyrInstance) plyrInstance.speed = 2;
  //   };
  const plyrVideo =
    videoId && provider ? (
      <Plyr
        ref={ref}
        source={{
          type: 'video',
          sources: [
            {
              src: `${props.url}`,
              provider: 'html5',
            },
          ],
        }}
        options={videoOptions}
      />
    ) : null;

  return (
    <div className='flex items-center justify-center rounded-lg bg-black'>
      {plyrVideo}
    </div>
  );
};

export default PlyrVideoCard;
