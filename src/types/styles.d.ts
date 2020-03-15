declare module "@dimelo/types/styles" {
  type ColorsDictionary =
    | "white"
    | "black"
    | "black18"
    | "black40"
    | "steel"
    | "skyBlue"
    | "paleSkyBlue"
    | "paleBlue"
    | "iceBlue"
    | "iceBlue2"
    | "coralTwo"
    | "duckEggBlue"
    | "duckEggBlue2"
    | "cerulean"
    | "azure"
    | "paleGrey"
    | "paleGrey2"
    | "paleGrey3"
    | "paleGrey4"
    | "paleGrey6"
    | "charcoalGrey"
    | "darkGrey"
    | "darkGrey1"
    | "darkGrey2"
    | "darkGrey3"
    | "darkGrey4"
    | "darkGrey5"
    | "silver"
    | "miamiGreen";

  type Colors = { [P in ColorsDictionary]: string };
}
