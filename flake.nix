{
    inputs = {
        nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
        flake-utils.url = "github:numtide/flake-utils";
        pnpm2nix = {
            url = "github:FliegendeWurst/pnpm2nix-nzbr";
            inputs = {
                nixpkgs.follows = "nixpkgs";
                flake-utils.follows = "flake-utils";
            };
        };
    };

    outputs = { self, nixpkgs, flake-utils, pnpm2nix, ... }:
        flake-utils.lib.eachDefaultSystem (system: let
            # Initialize nixpkgs
            pkgs = nixpkgs.legacyPackages.${system};
            inherit (pkgs) lib;
        in {
            packages = {
                default = self.packages.${system}.website;
                website = pkgs.callPackage ./nix/package.nix {
                    inherit (pnpm2nix.packages.${system}) mkPnpmPackage;
                };
            };
            devShells.default = pkgs.mkShellNoCC {
                # Add all build-time dependencies to the environment
                packages = [
                    pkgs.nodejs
                    pkgs.corepack
                ];
            };
        });
}
