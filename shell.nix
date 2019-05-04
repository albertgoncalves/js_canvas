{ pkgs ? import <nixpkgs> {} }:
with pkgs; mkShell {
    name = "JavaScript";
    buildInputs = [
        htmlTidy
        nodejs-8_x
    ];
    shellHook = ''
        if [ ! -e node_modules/.bin/jshint ]; then
            npm install --save-dev jshint
        fi
        export PATH="$PWD/node_modules/.bin/:$PATH"
    '';
}
