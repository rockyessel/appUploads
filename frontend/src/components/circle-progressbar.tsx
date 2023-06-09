const CircleProgressbar = ({ percent }: { percent: number }) => {
  const circumference = 30 * 2 * Math.PI;

  return (
    <div className='flex items-center justify-center overflow-hidden rounded-full'>
      <svg className='w-40 h-40 transform -rotate-90'>
        <circle
          className='text-rose-300'
          strokeWidth='3'
          stroke='currentColor'
          fill='transparent'
          r='30'
          cx='80'
          cy='80'
        />
        <circle
          className='text-rose-600'
          strokeWidth='3'
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percent / 100) * circumference}
          strokeLinecap='round'
          stroke='currentColor'
          fill='transparent'
          r='30'
          cx='80'
          cy='80'
        />
      </svg>
      <span className='absolute text-md text-rose-700'>{percent}%</span>
    </div>
  );
};

export default CircleProgressbar;
