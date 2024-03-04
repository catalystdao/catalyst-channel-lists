# Catalyst Channel Lists

The values stored within `src/config/chainsConfig.ts` are not to be used as strings but rather as numbers. They are stored string-y because otherwise they would be loaded as floats and JS would crush them.
