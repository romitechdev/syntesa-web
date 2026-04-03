import type { RouteConfig } from "@react-router/dev/routes";
import { index, layout, route } from "@react-router/dev/routes";

export default [
  layout("components/Layout.tsx", [
    index("routes/_index.tsx"),
    route("programs", "routes/programs.tsx"),
    route("about", "routes/about.tsx"),
    route("member", "routes/member.tsx"),
    route("terms-of-service", "routes/terms-of-service.tsx"),
  ]),
] satisfies RouteConfig;
