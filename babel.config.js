module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "#app": "./src/app",
          "#assets/*": "./src/assets/*",
          "#navigation": "./src/navigation",
          "#navigation/*": "./src/navigation/*",
          "#screens": "./src/screens",
          "#store": "./src/store",
          "#store/*": "./src/store/*",
          "#api": "./src/shared/api",
          "#components": "./src/shared/components",
          "#config": "./src/shared/config",
          "#constants": "./src/shared/constants",
          "#styles": "./src/shared/constants/styles",
          "#data": "./src/shared/data",
          "#models": "./src/shared/models",
          "#hooks": "./src/shared/hooks",
          "#types": "./src/shared/types",
          "#utils": "./src/shared/utils",
          "#ui": "./src/shared/ui",
        },
      },
    ],
    ["react-native-reanimated/plugin"],
    ["@babel/plugin-transform-export-namespace-from"],
  ],
};
