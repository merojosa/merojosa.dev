/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "merojosa-website",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          version: "6.52.0"
        }
      }
    };
  },
  async run() {
    new sst.aws.Astro("astro-site", { domain: "merojosa.dev", });
  },
});
