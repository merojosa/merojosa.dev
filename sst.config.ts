import type { SSTConfig } from "sst";
import { AstroSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "personal-website",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Astro({ stack }) {
      const site = new AstroSite(stack, "personal-website");
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
