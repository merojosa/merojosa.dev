import type { SSTConfig } from "sst";
import { AstroSite } from "sst/constructs";
import { aws_lambda } from 'aws-cdk-lib'

export default {
  config(_input) {
    return {
      name: "personal-website",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Astro({ stack }) {
      const site = new AstroSite(stack, "personal-website", {
        customDomain: {
          domainName: "jose-andres.dev",
          domainAlias: "www.jose-andres.dev"
        },
        memorySize: '1024 MB',
        runtime: "nodejs20.x",
        nodejs: {
          esbuild: {
            external: ['sharp'] // Ensures Sharp is excluded from the code bundle.
          }
        },
        cdk: {
          server: {
            layers: [
              new aws_lambda.LayerVersion(this, 'sharp', {
                /**
                 * This is a prebuilt layer for sharp.
                 * Source: https://github.com/pH200/sharp-layer
                 */
                code: aws_lambda.Code.fromAsset('./layers/sharp.zip'),
                compatibleRuntimes: [aws_lambda.Runtime.NODEJS_20_X],
                compatibleArchitectures: [aws_lambda.Architecture.ARM_64]
              })
            ]
          },
        },
      });
      stack.addOutputs({
        url: site.url,
      });
    });
  },
} satisfies SSTConfig;
