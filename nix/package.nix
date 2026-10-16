{
    # nixpkgs dependencies
    lib,
    nodejs-slim,
    callPackage,
    makeBinaryWrapper,

    # non-nixpkgs dependencies
    mkPnpmPackage, # https://github.com/FliegendeWurst/pnpm2nix-nzbr
    corepackCompat ? callPackage ./corepack-compat.nix {},
    customPnpm ? corepackCompat.pnpmFromPackageJson ../package.json,

    # overridables
    originalSrc ? ./..
}:
mkPnpmPackage {
    pname = "polyfrost-website";
    version = "0";

    # Setup pnpm package source
    src = lib.sources.cleanSourceWith {
        name = "website-src";
        src = lib.sources.cleanSourceWith {
            src = originalSrc;
            filter =
                name: type:
                let
                    baseName = baseNameOf (toString name);
                in
                !(builtins.elem baseName [ "dist" "node_modules" ".astro" ".output" ]);
        };
        filter = lib.sources.cleanSourceFilter;
    };
    packageJSON = ../package.json;
    pnpmLockYaml = ../pnpm-lock.yaml;
    pnpmWorkspaceYaml = ../pnpm-workspace.yaml;
    components = [ "./apps/website" ];

    nodejs = nodejs-slim;
    pnpm = customPnpm;

    scriptFull = ''
        pnpm website build
    '';

    # Point directly to the Nitro output directory relative to the workspace root
    distDir = "apps/website/.output";

    buildEnv = {
        ASTRO_TELEMETRY_DISABLED = "1";
    };

    extraNativeBuildInputs = [
        makeBinaryWrapper
    ];

    # Wrap the Nitro server entrypoint after pnpm2nix moves distDir into $out
    postInstall = ''
        mkdir -p "$out/bin"

        makeWrapper ${lib.getExe nodejs-slim} "$out/bin/start-server" \
             --inherit-argv0 \
             --add-flags "$out/server/index.mjs"
    '';

    meta = {
        mainProgram = "start-server";
        description = "The nodejs code to run polyfrost's website";
        homepage = "https://github.com/Polyfrost/website";
        license = lib.licenses.agpl3Only;
    };
}
