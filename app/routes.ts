import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("aichatbot", "routes/aichatbot.tsx"),
  route("contact", "routes/contact.tsx"),
  route("error", "routes/error.tsx"),
  route("forecast", "routes/forecast.tsx"),
] satisfies RouteConfig;
