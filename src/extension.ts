// the module 'vscode' contains the VS Code extensibility API
import * as vscode from 'vscode';

// this method is called when the extension is activated
export function activate(context: vscode.ExtensionContext) {
  // gulp watch preamp command
  let gulpCommand = vscode.commands.registerCommand(
    'extension.gulpWatch',
    (uri: vscode.Uri) => {
      const relativePath = vscode.workspace.asRelativePath(uri, false);
      const selectedFolderName = getSelectedFolderName(uri);

      if (
        relativePath
          .toString()
          .toLowerCase()
          .includes('preamp')
      ) {
        vscode.window.showInformationMessage(
          `Gulp watching '${selectedFolderName}'`
        );

        const terminal = vscode.window.createTerminal(
          `gulp: ${selectedFolderName}`
        );
        terminal.show(true);
        terminal.sendText(`gulp watch --preamp --asset='${relativePath}'`);
      } else {
        vscode.window.showErrorMessage(
          `'${selectedFolderName}' is not a preamp asset!`
        );
      }
    }
  );

  // start development node server
  let startNodeDevelopment = vscode.commands.registerCommand(
    'extension.startNodeDevelopment',
    (uri: vscode.Uri) => {
      const relativePath = vscode.workspace.asRelativePath(uri);

      vscode.window.showInformationMessage(`Starting Node: Development`);
      const terminal = vscode.window.createTerminal(`node: development`);
      terminal.show(true);
      terminal.sendText(`cd ~/www/src/chec/checkout.node`);
      terminal.sendText(`npm run dev`);
    }
  );

  // start production node server
  let startNodeProduction = vscode.commands.registerCommand(
    'extension.startNodeProduction',
    (uri: vscode.Uri) => {
      const relativePath = vscode.workspace.asRelativePath(uri);

      vscode.window.showInformationMessage(`Starting Node: Production`);
      const terminal = vscode.window.createTerminal(`node: production`);
      terminal.show(true);
      terminal.sendText(`cd ~/www/src/chec/checkout.node`);
      terminal.sendText(`npm run prod`);
    }
  );

  // deploy to staging command
  let deployStagingCommand = vscode.commands.registerCommand(
    'extension.deployStaging',
    (uri: vscode.Uri) => {
      const selectedFolderName = getSelectedFolderName(uri);

      vscode.window
        .showWarningMessage(
          `Deploy '${selectedFolderName}' to STAGING?`,
          ...['Yes', 'No']
        )
        .then(selection => {
          deployTerminalCommand(selectedFolderName, selection, 'uat');
        });
    }
  );

  // deploy to production command
  let deployProdCommand = vscode.commands.registerCommand(
    'extension.deployProduction',
    (uri: vscode.Uri) => {
      const selectedFolderName = getSelectedFolderName(uri);

      vscode.window
        .showWarningMessage(
          `Deploy '${selectedFolderName}' to PRODUCTION?`,
          ...['Yes', 'No']
        )
        .then(selection => {
          deployTerminalCommand(selectedFolderName, selection, 'prod');
        });
    }
  );

  context.subscriptions.push(
    gulpCommand,
    deployStagingCommand,
    deployProdCommand,
    startNodeDevelopment,
    startNodeProduction
  );

  /**
   * Opens a new terminal instance and runs the deploy npm script.
   *
   * @param selectedFolderName The selected folder name.
   * @param selection Selected answer from confirmation dialog.
   * @return void
   */
  function deployTerminalCommand(
    selectedFolderName: string = '',
    selection: string = 'no',
    environment: string = ''
  ): void {
    if (selection.toLowerCase() === 'yes') {
      vscode.window.showInformationMessage(
        `Deploying '${selectedFolderName}' to ${environment} !`
      );

      const terminal = vscode.window.createTerminal(
        `deploy - ${environment}:${selectedFolderName}`
      );
      terminal.show(true);
      terminal.sendText(`cd ~/www/src/chec/checkout.core/v2`);
      terminal.sendText(`npm run deploy:${environment}:${selectedFolderName}`);
    } else {
      vscode.window.showInformationMessage(`Deploy cancelled!`);
    }
  }

  /**
   * Parses out folder name from a folder path
   *
   * @param uri The vscode uri
   * @return A string which is the foldername
   */
  function getSelectedFolderName(uri: vscode.Uri): string {
    const selectedFolderName = vscode.workspace
      .asRelativePath(uri, false)
      .split('/')
      .pop();
    return selectedFolderName ? selectedFolderName : '';
  }
}

// this method is called when the extension is deactivated. usually used for freeing up resources.
export function deactivate() {}
