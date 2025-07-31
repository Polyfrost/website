{
    # nixpkgs dependencies
    lib,
    nodejs,
    callPackage,

    # non-nixpkgs dependencies
    mkPnpmPackage, # https://github.com/FliegendeWurst/pnpm2nix
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

    inherit nodejs;
    pnpm = customPnpm;

    scriptFull = ''
        pnpm website build
    '';

    buildEnv = {
        ASTRO_TELEMETRY_DISABLED = "1";
    };

    installPhase = ''
        runHook preInstall

        mkdir -p "$out"/{bin,lib}

        # Copy all the astro files to the output
        cp -r ./apps/website/dist/* "$out"/share/

        # Make a wrapper command to start the server
        cat << EOF > "$out"/bin/start-server
        #!/usr/bin/env bash
        ${lib.getExe nodejs} "$out"/share/server/entry.mjs
        EOF
        chmod +x "$out"/bin/start-server

        runHook postInstall
    '';

    meta = {
        mainProgram = "start-server";
        description = "The nodejs code to run polyfrost's website";
        homepage = "https://github.com/Polyfrost/website";
        license = lib.licenses.agpl3Only;
    };
}
