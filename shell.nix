{pkgs ? import <nixpkgs>{}}:

pkgs.mkShell
{
  nativeBuildInputs = [
    pkgs.go
    pkgs.gotools
    pkgs.gopls
    pkgs.gnumake
    pkgs.git
    #pkgs.air
    pkgs.nodejs_22
    pkgs.typescript
  ];
}
