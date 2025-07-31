{
    lib,
    pnpm,
}:
{
    pnpmFromPackageJson =
        packageJsonPath:
        let
            parsedPackageJson = builtins.fromJSON (builtins.readFile packageJsonPath);

            pnpmSpec = lib.strings.removePrefix "pnpm@" parsedPackageJson.packageManager;
            splitPnpmSpec = lib.splitString "+" pnpmSpec;

            pnpmVersion = builtins.elemAt splitPnpmSpec 0;

            pnpmHashSpec = lib.splitString "." (builtins.elemAt splitPnpmSpec 1);
            pnpmHashAlgo = builtins.elemAt pnpmHashSpec 0;
            pnpmHashDigest = builtins.elemAt pnpmHashSpec 1;
        in
        pnpm.override {
            version = pnpmVersion;
            hash = "${pnpmHashAlgo}:${pnpmHashDigest}";
        };
}
