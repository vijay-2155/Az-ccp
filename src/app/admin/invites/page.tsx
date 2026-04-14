import { clerkClient } from "@clerk/nextjs/server";
import InviteForm from "./InviteForm";
import RevokeButton from "./RevokeButton";

export default async function InvitesPage() {
  const clerk = await clerkClient();
  const { data: pending } = await clerk.invitations.getInvitationList({
    status: "pending",
    limit: 100,
  });

  return (
    <div className="space-y-10 max-w-2xl">
      {/* Header */}
      <div>
        <p
          className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-2"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Access
        </p>
        <h1
          className="text-2xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-unbounded)" }}
        >
          Invitations
        </h1>
        <p className="mt-2 text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Sign-ups are restricted. Only invited email addresses can create an account.
        </p>
      </div>

      {/* Send invite */}
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-1 h-4 rounded-full"
            style={{ background: "#FFD60A" }}
          />
          <span
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Send Invitation
          </span>
        </div>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Clerk will send an email with a sign-up link. The link expires after 24 hours.
        </p>
        <InviteForm />
      </div>

      {/* Pending invites */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <h2
            className="text-sm font-bold text-white"
            style={{ fontFamily: "var(--font-unbounded)" }}
          >
            Pending
          </h2>
          {pending.length > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: "rgba(34,211,238,0.1)",
                color: "#22D3EE",
              }}
            >
              {pending.length}
            </span>
          )}
        </div>

        {pending.length === 0 ? (
          <div
            className="rounded-2xl py-12 text-center text-sm"
            style={{
              border: "1px dashed rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            No pending invitations.
          </div>
        ) : (
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {pending.map((inv, i) => (
              <div
                key={inv.id}
                className="flex items-center justify-between px-6 py-4"
                style={{
                  borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                }}
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {inv.emailAddress}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Invited{" "}
                    {new Date(inv.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] font-semibold uppercase tracking-[0.12em] px-2.5 py-1 rounded-lg"
                    style={{
                      background: "rgba(34,211,238,0.1)",
                      color: "#22D3EE",
                    }}
                  >
                    Pending
                  </span>
                  <RevokeButton id={inv.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
