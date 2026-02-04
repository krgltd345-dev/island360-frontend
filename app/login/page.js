import CardComponent from '@/components/auth/CardComponent';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {

  let getGoogleLogin = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google/clientId`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      // throw new Error(`API failed with status ${res.status}`);
    }

    getGoogleLogin = await res.json();
  } catch (error) {
    console.error("Google login API error:", error);
  }

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 py-12 overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-cyan-900/30" />

      {/* Glassmorphism Form Card */}
      <div className="relative w-full max-w-md space-y-8 rounded-3xl backdrop-blur-xl bg-white/20 dark:bg-white/10 p-8 shadow-2xl border border-white/30 dark:border-white/20">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <CardComponent getGoogleLogin={getGoogleLogin} />
      </div>
    </div>
  );
}

