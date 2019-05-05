{ pkgs ? import <nixpkgs> {} }:
with pkgs; mkShell {
    name = "JavaScript";
    buildInputs = [
        htmlTidy
        nodejs-8_x
    ];
    shellHook = ''
        . .shellhook
    '';
}
