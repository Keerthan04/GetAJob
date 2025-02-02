import { Employer } from '@/types';
import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const EmployerDataContext = createContext<
  | {
      employerData: Employer | null;
      setEmployerData: React.Dispatch<React.SetStateAction<Employer | null>>;
    }
  | undefined
>({
  employerData: null,
  setEmployerData: () => {},
});

const EmployeerContext = ({ children }:{children: React.ReactNode}) => {
  const [employerData, setEmployerData] = useState<Employer | null>(null);
  return (
    <div>
      <EmployerDataContext.Provider value={{ employerData, setEmployerData }}>
        {children}
      </EmployerDataContext.Provider>
    </div>
  )
}

export default EmployeerContext
