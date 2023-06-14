import EmptyIcon from '../assets/empty.svg';

interface Props {
  message: string;
}

const EmptyDocument = (props: Props) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-[rgba(255,255,255,0.1)] backdrop-blur-lg rounded-lg'>
      <span className='inline-flex items-center'>
        <img className='animate-bounce w-20' src={EmptyIcon} alt='' />
      </span>
      <p className='font-bold text-2xl'>No Documents in {props.message}</p>
    </div>
  );
};

export default EmptyDocument;
