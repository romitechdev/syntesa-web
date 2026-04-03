import { expect, test } from "@playwright/test";
import { execSync } from "child_process";

interface RouteNode {
  id: string;
  path?: string;
  index?: boolean;
  file: string;
  children?: RouteNode[];
}

/**
 * Recursively extract non-dynamic routes from the React Router.
 */
function extractRoutes(nodes: RouteNode[], parentPath = ""): string[] {
  const routes: string[] = [];

  for (const node of nodes) {
    let currentPath = parentPath;

    if (node.path !== undefined) {
      const segment = node.path.replace(/^\//, "");
      if (currentPath === "" || currentPath === "/") {
        currentPath = `/${segment}`;
      } else {
        currentPath = `${currentPath}/${segment}`;
      }
    }

    // Clean trailing slash if any (unless its strictly the root '/')
    if (currentPath.length > 1 && currentPath.endsWith("/")) {
      currentPath = currentPath.slice(0, -1);
    }

    // Skip parameterized or wildcard routes (e.g., :id, *)
    const isDynamic = currentPath.includes(":") || currentPath.includes("*");

    if (!isDynamic) {
      if (node.index) {
        routes.push(currentPath || "/");
      } else if (!node.children || node.children.length === 0) {
        // If it's a leaf node that has an explicit path defined, record it.
        if (node.path !== undefined) {
          routes.push(currentPath || "/");
        }
      }
    }

    // Recursive part.
    if (node.children) {
      routes.push(...extractRoutes(node.children, currentPath));
    }
  }

  return routes;
}

/**
 * Invokes the React Router CLI to dynamically obtain all routes of the application.
 */
function getApplicationRoutes(): string[] {
  try {
    const output = execSync("npx react-router routes --json", { encoding: "utf-8" });
    const routeTree: RouteNode[] = JSON.parse(output);
    const allRoutes = extractRoutes(routeTree);

    const uniqueRoutes = [...new Set(allRoutes)];
    return uniqueRoutes.length > 0 ? uniqueRoutes : ["/"];
  } catch (error) {
    console.warn("Failed to dynamically fetch React Router routes. Defaulting to home (/).", error);
    return ["/"];
  }
}

const routes = getApplicationRoutes();

for (const route of routes) {
  test(`Route ${route} is accessible and loads correctly`, async ({ page }) => {
    // Navigate to the route
    const response = await page.goto(route);

    // Verify that the route returned a successful HTTP response
    expect(response?.ok()).toBeTruthy();

    // Basic structural verification: ensure body renders and page doesn't show React Router default error messages
    await expect(page.locator("body")).toBeVisible();

    // Check that we didn't hit a 404 or uncaught error boundary that we typically don't want
    const bodyText = await page.locator("body").innerText();
    expect(bodyText.toLowerCase()).not.toContain("page not found");
    expect(bodyText.toLowerCase()).not.toContain("application error");

    // Check that at least one primary container or section is rendered.
    // Usually, well-formed pages have a header, main, or footer.
    const hasHeaderOrFooter = await page.locator("header, footer, nav, main").count();
    expect(hasHeaderOrFooter).toBeGreaterThan(0);
  });
}
