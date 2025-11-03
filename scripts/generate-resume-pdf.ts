import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { spawn, type ChildProcess } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function startDevServer(): Promise<{ kill: () => Promise<void>; port: number }> {
	return new Promise((resolve, reject) => {
		const serverProcess = spawn('pnpm', ['dev'], {
			cwd: join(__dirname, '..'),
			stdio: 'pipe',
		});

		let resolved = false;

		serverProcess.stdout?.on('data', (data) => {
			const output = data.toString();
			console.log(output);

			if (!resolved && output.includes('http://localhost:')) {
				const portMatch = output.match(/http:\/\/localhost:(\d+)/);
				if (portMatch) {
					const port = parseInt(portMatch[1], 10);
					resolved = true;
					setTimeout(
						() =>
							resolve({
								kill: () => killProcess(serverProcess),
								port,
							}),
						2000,
					);
				}
			}
		});

		serverProcess.stderr?.on('data', (data) => {
			console.error(data.toString());
		});

		serverProcess.on('error', (error) => {
			reject(error);
		});

		setTimeout(() => {
			if (!resolved) {
				killProcess(serverProcess);
				reject(new Error('Dev server failed to start within timeout'));
			}
		}, 30000);
	});
}

function killProcess(proc: ChildProcess): Promise<void> {
	return new Promise((resolve) => {
		if (proc.killed || proc.exitCode !== null) {
			resolve();
			return;
		}

		proc.once('exit', () => {
			resolve();
		});

		proc.kill('SIGTERM');

		setTimeout(() => {
			if (proc.exitCode === null) {
				proc.kill('SIGKILL');
			}
		}, 5000);
	});
}

async function generateResumePDF() {
	console.log('Starting PDF generation...');

	let server: { kill: () => Promise<void>; port: number } | null = null;

	try {
		console.log('Starting dev server...');
		server = await startDevServer();

		console.log('Launching browser...');
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox'],
		});

		try {
			const page = await browser.newPage();

			const url = `http://localhost:${server.port}/resume`;
			console.log(`Navigating to ${url}...`);

			await page.goto(url, {
				waitUntil: 'networkidle0',
				timeout: 30000,
			});

			console.log('Generating PDF...');

			const outputPath = join(__dirname, '../public/resume.pdf');
			await page.pdf({
				path: outputPath,
				format: 'A4',
				printBackground: true,
				margin: {
					top: '0',
					right: '0',
					bottom: '0',
					left: '0',
				},
			});

			console.log(`✓ Resume PDF generated successfully at: ${outputPath}`);
		} finally {
			await browser.close();
		}
	} finally {
		if (server) {
			console.log('Stopping dev server...');
			await server.kill();
		}
	}
}

generateResumePDF()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error('Error generating PDF:', error);
		process.exit(1);
	});
