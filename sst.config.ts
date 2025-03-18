/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "merojosa-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
    };
  },
  async run() {
    new sst.aws.Astro("astro-site", {
      domain: {
        name: "merojosa.dev", redirects:
          ["www.merojosa.dev"]
      }, server: { install: ["sharp"] }
    });
  },
});
