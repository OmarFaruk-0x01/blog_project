import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { logout } from "@/session.server";

export async function action({ request }: ActionArgs) {
  return await logout(request);
}

export async function loader({ request }: LoaderArgs) {
  return await logout(request);
}
