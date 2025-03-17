import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-2xl">Hello App!</h1>
      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
      ) : (
        <div>Not Signed In</div>
      )}
    </div>
  );
}
