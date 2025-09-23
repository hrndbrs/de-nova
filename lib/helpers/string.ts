export const formatId = (id: string): string => {
  return id
    .replace(/^https?:\/\/.+\/result\//, "")
    .toLowerCase()
    .replaceAll(" ", "");
};

export const validId: (id: string) => boolean = (id: string) =>
  /^[0-9a-fA-F]{24}$/.test(id);

export const base64url = {
  encode: (str: string) => escape(Buffer.from(str, "utf8").toString("base64")),
  decode: (str: string) => {
    const trimmedString = str
      .split("?")[0]
      .replaceAll("=", "")
      .replaceAll("%3D", "");
    return JSON.parse(
      Buffer.from(unescape(trimmedString), "base64").toString("utf8"),
    );
  },
};
