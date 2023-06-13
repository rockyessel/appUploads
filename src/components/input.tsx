import React from 'react';

interface Props {
  value?: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styles?: string;
  type?: string;
  label?: string;
  elementType: string;
  disabled?: boolean | undefined;
  step?: number | string | undefined;
}

const Input = (props: Props) => {
  return (
    <label className='w-full flex flex-col gap-1'>
      <span className='font-medium text-lg'>{props.label}</span>

      {props.elementType === 'input' && (
        <input
          name={props.name}
          type={props.type}
          value={props.value}
          step={props.step}
          onChange={props.onChange}
          placeholder={props.placeholder}
          disabled={props.disabled}
          className={`${props.styles} bg-transparent border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
        />
      )}

      {props.elementType === 'file' && (
        <input
          name={props.name}
          type={'file'}
          value={props.value}
          onChange={props.onChange}
          className={`${props.styles} file-input file-input-bordered file-input-primary w-full max-w-xs bg-transparent border-[1px] border-[#3a3a43]`}
        />
      )}
    </label>
  );
};

export default Input;
