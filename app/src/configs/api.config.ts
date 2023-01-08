import Api from "@tryghost/content-api";

const api = Api({
  key: process.env.NEXT_PUBLIC_BACKEND_SECRET as string,
  url: process.env.NEXT_PUBLIC_BACKEND_URL as string,
  version: "v5.0",
});

export default api;
