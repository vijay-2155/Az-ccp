import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const clerk = await clerkClient();
  const { data } = await clerk.invitations.getInvitationList({
    status: "pending",
    limit: 100,
  });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email is required" }, { status: 400 });

  const clerk = await clerkClient();
  try {
    const invitation = await clerk.invitations.createInvitation({
      emailAddress: email,
      ignoreExisting: false,
    });
    return NextResponse.json(invitation, { status: 201 });
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message : "Failed to create invitation";
    return NextResponse.json({ error: msg }, { status: 422 });
  }
}
