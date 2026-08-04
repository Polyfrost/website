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
                !(builtins.elem baseName [ "dist" "node_modules" ".astro" ]);
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

    distDir = "apps/website/dist";

    buildEnv = {
        ASTRO_TELEMETRY_DISABLED = "1";
    };

    extraNativeBuildInputs = [
        makeBinaryWrapper
    ];

    postInstall = ''
        mkdir -p "$out/bin"

        # Make a wrapper command to start the server
        makeWrapper ${lib.getExe nodejs-slim} "$out/bin/start-server" \
             --inherit-argv0 \
             --add-flags "$out/server/entry.mjs"
    '';

    meta = {
        mainProgram = "start-server";
        description = "The nodejs code to run polyfrost's website";
        homepage = "https://github.com/Polyfrost/website";
        license = lib.licenses.agpl3Only;
    };
}
