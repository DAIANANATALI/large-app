import { type RouteConfig } from "@react-router/dev/routes";
import { nextRoutes } from "rr-next-routes/react-router";

const routes = nextRoutes({ folderName: "app", print: "info" });

export default routes satisfies RouteConfig;
