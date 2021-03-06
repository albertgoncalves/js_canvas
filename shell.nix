{ pkgs ? import <nixpkgs> {} }:
with pkgs; mkShell {
    name = "JavaScript";
    buildInputs = [
        clang-tools
        htmlTidy
        nodejs-8_x
    ];
    shellHook = ''
        . .shellhook
    '';
}
