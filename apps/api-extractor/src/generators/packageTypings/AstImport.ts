// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

export interface IAstImportParameters {
  readonly modulePath: string;
  readonly exportName: string;
}

export class AstImport {
  /**
   * The name of the external package (and possibly module path) that this definition
   * was imported from.  If it was defined in the referencing source file, or if it was
   * imported from a local file, or if it is an ambient definition, then externalPackageName
   * will be undefined.
   *
   * Example: "@microsoft/gulp-core-build/lib/IBuildConfig"
   */
  public readonly modulePath: string;

  /**
   * If importPackagePath is defined, then this specifies the export name for the definition.
   *
   * Example: "IBuildConfig"
   */
  public readonly exportName: string;

  /**
   * If importPackagePath and importPackageExportName are defined, then this is a dictionary key
   * that combines them with a colon (":").
   *
   * Example: "@microsoft/gulp-core-build/lib/IBuildConfig:IBuildConfig"
   */
  public readonly key: string;

  public constructor(parameters: IAstImportParameters) {
    this.modulePath = parameters.modulePath;
    this.exportName = parameters.exportName;

    this.key = `${this.modulePath}:${this.exportName}`;
  }
}
