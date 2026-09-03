/** Filename of the generated OpenContext config template. */
export const CONFIG_FILENAME = ".opencontext.json";

/** Directory that holds the context topic files. */
export const CONTEXT_DIR_NAME = ".opencontext";

/** Template written when no .opencontext.json exists yet. */
export const CONFIG_CONTENT = `{
  "path": ".opencontext",
  "readOnly": false,
  "autoIndex": true,
  "guard": {
    "enabled": true,
    "maxFileSizeKb": 50,
    "strictPatternCheck": true
  }
}
`;