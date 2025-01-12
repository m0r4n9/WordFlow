import { Link } from '@tanstack/react-router';

export const Header = () => (
  <header className='flex items-center justify-between h-15 py-4'>
    <div className='flex items-center justify-between gap-4'>
      <Link to='/'>Home</Link>
      <Link to='/auth/signIn'>Auth</Link>
      <Link to='/about'>About</Link>
    </div>
  </header>
);
