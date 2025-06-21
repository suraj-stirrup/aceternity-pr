import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// user/signup layout component
const SignInLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default SignInLayout;