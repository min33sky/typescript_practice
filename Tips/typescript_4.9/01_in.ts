interface Context {
  packageJSON: unknown;
}

function tryGetPackageName(context: Context) {
  const packageJSON = context.packageJSON;
  if (packageJSON && typeof packageJSON === 'object') {
    if ('name' in packageJSON && typeof packageJSON.name === 'string') {
      return packageJSON.name;
      //                  ^?
    }
  }
}
