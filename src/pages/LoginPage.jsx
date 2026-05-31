import LoginForm from '../components/LoginForm'

function LoginPage() {
  return (
    <div
      className="min-h-screen bg-black relative flex items-center justify-center"
      style={{
        backgroundImage: `url('https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e5-1b4e360ec43d/a1181d97-3b71-4b5f-8f71-70a3a6e2bc35/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_small.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

     {/* NovaCine Logo */}
<div className="absolute top-6 left-10">
  <h1 className="text-red-600 text-5xl font-extrabold tracking-widest">
    Nova<span className="text-white">Cine</span>
  </h1>
</div>

      {/* Login Form Card */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage