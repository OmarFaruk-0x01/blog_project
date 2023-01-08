import { redirect } from "@remix-run/server-runtime";

export const loader = () => {
  return redirect(`${process.env.ADMIN_PATH}/posts`);
};
