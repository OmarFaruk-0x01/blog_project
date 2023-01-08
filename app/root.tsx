import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useTransition,
} from "@remix-run/react";
import Nprogress from "nprogress";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import globalStyles from "./styles/global.css";

import { getSession, getUser, sessionStorage } from "./session.server";
import SearchModal from "@components/SearchModal";
import { SWRConfig } from "swr";
import { useEffect } from "react";
import Dialog from "@components/Dialog";
import Overlay from "@components/Overlay";
import { ToastMessage } from "@interfaces/toast";
import { Toaster, toast } from "react-hot-toast";

Nprogress.configure({ showSpinner: true });

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: globalStyles },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap",
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Posts",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  const session = await getSession(request);

  const toastMessage = await session.get("toast");

  return json(
    {
      toastMessage,
      user: await getUser(request),
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }
  );
}

const fetcher = (arg: string) => fetch(arg).then((data) => data.json());

export default function App() {
  const transition = useTransition();
  const data = useLoaderData<typeof loader>();
  const toastMessage = data.toastMessage as ToastMessage;

  useEffect(() => {
    if (toastMessage) {
      switch (toastMessage.type) {
        case "error":
          toast.error(toastMessage.message);
          return;
        case "success":
          toast.success(toastMessage.message);
          return;
      }
    }
  }, [toastMessage]);

  useEffect(() => {
    if (transition.state === "loading" || transition.state === "submitting") {
      Nprogress.start();
    }
    if (transition.state === "idle") {
      Nprogress.done();
    }
  }, [transition.state]);

  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <SWRConfig value={{ fetcher }}>
          <Outlet />
        </SWRConfig>
        <Toaster />
        <Dialog />
        <Overlay />
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  );
}
