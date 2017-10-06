// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as fsx from 'fs-extra';

import {
  CommandLineAction,
  CommandLineStringParameter
} from '@microsoft/ts-command-line';

import { ApiExtractorCommandLine } from './ApiExtractorCommandLine';

export class SimpleAction extends CommandLineAction {
  private _parser: ApiExtractorCommandLine;
  private _dtsFileParameter: CommandLineStringParameter;

  constructor(parser: ApiExtractorCommandLine) {
    super({
      actionVerb: 'simple',
      summary: 'Process loose *.d.ts files (without a project)',
      documentation: 'Use this command for very simple API Extractor usage scenarios'
    });
    this._parser = parser;
  }

  protected onDefineParameters(): void { // override
    this._dtsFileParameter = this.defineStringParameter({
      parameterLongName: '--dtsFile',
      parameterShortName: '-f',
      key: 'FILE',
      description: `Uses the specified *.d.ts file as the entry point`
    });
  }

  protected onExecute(): void { // override
    if (!this._dtsFileParameter.value) {
      throw new Error('The -f parameter is required');
    }

    const dtsFilename: string = this._dtsFileParameter.value;
    if (!fsx.existsSync(dtsFilename)) {
      throw new Error('Input file not found: ' + dtsFilename);
    }


  }
}