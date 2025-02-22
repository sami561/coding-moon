// Packages
import { FC } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';

// States
import battleState from '../../atoms/battle';

// Types
import TextBoxType from '../../types/props/2d/textBox';
import BattleType from '../../types/battle';

const TextBox: FC<TextBoxType> = (props: TextBoxType) => {
  // Props
  const { text }: TextBoxType = props;

  return (
    <div className='flex flex-col items-center justify-center bg-black/25 h-full w-full space-y-4'>
      <div className='bg-white/75 rounded-tl-xl rounded-br-xl ring-4 ring-cyan-400/50 border-2 border-white py-4 px-8'>
        <p className='text-lg font-semibold text-black'>{text}</p>
      </div>
    </div>
  );
};

export default TextBox;
