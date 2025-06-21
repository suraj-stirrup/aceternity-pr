import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// user/signup layout component
const SignUpLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default SignUpLayout;
