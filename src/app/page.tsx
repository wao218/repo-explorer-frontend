import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <p>Repo Explorer</p>
      <div>
        <p>Welcome!</p>
        <p>
          Don't have an account yet? <span>Sign up</span>
        </p>
        <form action='' method='post'>
          <input type='email' name='email' id='email' />
          <input type='password' name='password' id='password' />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
}
