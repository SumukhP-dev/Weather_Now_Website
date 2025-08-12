import HomePage from "~/pages/home";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeatherNow" }];
}

export default function Home() {
  return <HomePage />;
}
