import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("geminiaichatbot", "routes/geminiaichatbot.tsx"),
  route("contact", "routes/contact.tsx"),
  route("error", "routes/error.tsx"),
  route("forecast", "routes/forecast.tsx"),
  route("ragaichatbot", "routes/ragaichatbot.tsx"),
] satisfies RouteConfig;
