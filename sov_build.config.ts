import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      input: "src/package/index.tsx",
      output: "dist/package/index",
      options: {
        type: "react",
        packageConfig: {
          isPackage: true,
          dtsEntryRoot: "src/package",
          dtsInclude: ["src/package/**/*"],
        },
      },
    },
  ],
};

export default buildConfig;
