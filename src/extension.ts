// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let NEXT_TERM_ID = 1;
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "helloworld" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let gulpCommand = vscode.commands.registerCommand('extension.gulpWatch', (uri:vscode.Uri) => {
		// The code you place here will be executed every time your command is executed

		const relativePath = vscode.workspace.asRelativePath(uri, false);
		const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);

		// Display a message box to the user
		vscode.window.showInformationMessage(`Watching ${workspaceFolder}`);

		console.log(workspaceFolder);
		console.log(uri);

		const terminal = vscode.window.createTerminal(`Gulp Watch ${NEXT_TERM_ID}`);
		terminal.show(true);
		terminal.sendText(`gulp watch --preamp --asset='${relativePath}'`);
		NEXT_TERM_ID++;
	});

	let deployStagingCommand = vscode.commands.registerCommand('extension.deployStaging', (uri: vscode.Uri) => {
		vscode.window.showInformationMessage(`Deploy to staging?`);
	});

	let deployProdCommand = vscode.commands.registerCommand('extension.deployProduction', (uri: vscode.Uri) => {
		vscode.window.showInformationMessage(`Deploy to production?`);
	});

	context.subscriptions.push(gulpCommand, deployStagingCommand, deployProdCommand);
}
// this method is called when your extension is deactivated
export function deactivate() {}
