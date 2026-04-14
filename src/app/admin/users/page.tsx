import { clerkClient, currentUser } from "@clerk/nextjs/server";

function timeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(ms).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default async function UsersPage() {
  const [clerk, me] = await Promise.all([clerkClient(), currentUser()]);
  const { data: users } = await clerk.users.getUserList({ limit: 100, orderBy: "-created_at" });

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            Members
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-unbounded)" }}>
            Users
            <span className="ml-3 text-sm font-normal align-middle px-2.5 py-1 rounded-lg"
              style={{ background: "rgba(255,214,10,0.1)", color: "#FFD60A", fontFamily: "var(--font-outfit)" }}>
              {users.length}
            </span>
          </h1>
        </div>
      </div>

      {/* User list */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
        {users.map((user, i) => {
          const email = user.emailAddresses[0]?.emailAddress ?? "—";
          const name = [user.firstName, user.lastName].filter(Boolean).join(" ") || email.split("@")[0];
          const isMe = user.id === me?.id;
          const initials = name.slice(0, 2).toUpperCase();

          return (
            <div
              key={user.id}
              className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.02]"
              style={{ borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none" }}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                {user.imageUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={user.imageUrl}
                    alt={name}
                    className="w-9 h-9 rounded-full object-cover"
                    style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                  />
                ) : (
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(255,214,10,0.12)", color: "#FFD60A", border: "1px solid rgba(255,214,10,0.2)" }}
                  >
                    {initials}
                  </div>
                )}
                {/* Online dot — placeholder, Clerk doesn't provide real-time presence */}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white truncate">{name}</p>
                  {isMe && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded"
                      style={{ background: "rgba(255,214,10,0.1)", color: "#FFD60A" }}>
                      You
                    </span>
                  )}
                </div>
                <p className="text-xs mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.35)" }}>
                  {email}
                </p>
              </div>

              {/* Meta */}
              <div className="hidden sm:flex flex-col items-end gap-1 shrink-0 text-right">
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Joined {new Date(user.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
                {user.lastSignInAt && (
                  <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
                    Last seen {timeAgo(user.lastSignInAt)}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {users.length === 0 && (
          <div className="py-16 text-center text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
            No users yet.
          </div>
        )}
      </div>
    </div>
  );
}
