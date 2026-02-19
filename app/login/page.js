import CardComponent from '@/components/auth/CardComponent';

export const dynamic = 'force-dynamic';

export default async function LoginPage() {

  let getGoogleLogin = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google/clientId`,
      { cache: "no-store" }
    );

    if (res.ok) {
      // throw new Error(`API failed with status ${res.status}`);
      getGoogleLogin = await res.json();
    }
  } catch (error) {
    console.error("Google login API error:", error);
  }

  return (
    <div
      className="relative flex min-h-screen bg-left sm:bg-top items-center justify-center px-4 overflow-hidden"
      style={{
        backgroundImage: `url('/cover1.jpeg')`,
        backgroundSize: 'cover',
        // backgroundPosition: 'top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-transparent to-cyan-900/30" />

      {/* Glassmorphism Form Card */}
      <div className="relative w-full max-w-md space-y-8 rounded-xl sm:rounded-3xl backdrop-blur-xl bg-white/20 dark:bg-white/10 p-4 sm:p-8 shadow-2xl border border-white/30 dark:border-white/20">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
        <CardComponent getGoogleLogin={getGoogleLogin} />
      </div>
    </div>
  );
}

