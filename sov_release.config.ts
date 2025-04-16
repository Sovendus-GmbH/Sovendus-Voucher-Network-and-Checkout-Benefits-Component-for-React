import type { ReleaseConfig } from "sovendus-release-tool";

const releaseConfig: ReleaseConfig = {
  packages: [
    {
      directory: "./",
      updateDeps: true,
      lint: true,
      build: true,
      test: false,
      release: {
        version: "2.0.7",
        versionBumper: [
          {
            filePath: "src/package/constants.ts",
            varName: "version",
          },
        ],
      },
    },
  ],
};
export default releaseConfig;
