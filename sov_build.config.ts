import type { BuildConfig } from "sovendus-builder";

const buildConfig: BuildConfig = {
  foldersToClean: ["dist"],
  filesToCompile: [
    {
      sovOptions: {
        input: "src/package/index.tsx",
        output: "dist/package/index",
        type: "react",
        modulesToExternalize: ["react/jsx-runtime"],
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
