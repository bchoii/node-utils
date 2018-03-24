(function() {
	var childProcess = require('child_process');
	var oldSpawn = childProcess.spawn;
	function mySpawn() {
		console.log('spawn called');
		console.log(arguments);
		var result = oldSpawn.apply(this, arguments);
		return result;
	}
	childProcess.spawn = mySpawn;
})();

const spawn = require('child_process').spawn;
const robot = require('robotjs');

const run = (commands, options = {}) => {
	return new Promise((res, rej) => {
		const _commands = commands.split(' ');
		const task = spawn(_commands[0], _commands.splice(1), options);
		let response = '';
		task.stdout.on('data', function(data) {
			response += data.toString('utf8');
			process.stdout.write(data.toString('utf8'));
		});
		task.stderr.on('data', function(data) {
			process.stderr.write(data.toString('utf8'));
		});
		task.on('exit', function(code, signal) {
			console.log(`child process '${commands}' exited with code '${code}' and signal '${signal}'`);
			res({ code, signal, response });
		});
	});
};

const sleep = async (amount) => {
	await new Promise((r) => setTimeout(r, amount));
};

const _pbcopy = (text) => {
	var proc = spawn('pbcopy');
	proc.stdin.write(text);
	proc.stdin.end();
};

function keyTap(key, modifier) {
	if (modifier) {
		robot.keyTap(key, modifier);
	} else {
		robot.keyTap(key);
	}
}

function type(command) {
	command.split('').map((key) => {
		switch (key) {
			case '~':
				robot.keyTap('`', [ 'shift' ]);
				break;
			case '!':
				robot.keyTap('1', [ 'shift' ]);
				break;
			case '@':
				robot.keyTap('2', [ 'shift' ]);
				break;
			case '#':
				robot.keyTap('3', [ 'shift' ]);
				break;
			case '$':
				robot.keyTap('4', [ 'shift' ]);
				break;
			case '%':
				robot.keyTap('5', [ 'shift' ]);
				break;
			case '^':
				robot.keyTap('6', [ 'shift' ]);
				break;
			case '&':
				robot.keyTap('7', [ 'shift' ]);
				break;
			case '*':
				robot.keyTap('8', [ 'shift' ]);
				break;
			case '(':
				robot.keyTap('9', [ 'shift' ]);
				break;
			case ')':
				robot.keyTap('0', [ 'shift' ]);
				break;
			case '_':
				robot.keyTap('-', [ 'shift' ]);
				break;
			case '+':
				robot.keyTap('=', [ 'shift' ]);
				break;
			case '{':
				robot.keyTap('[', [ 'shift' ]);
				break;
			case '}':
				robot.keyTap(']', [ 'shift' ]);
				break;
			case '<':
				robot.keyTap(',', [ 'shift' ]);
				break;
			case '>':
				robot.keyTap('.', [ 'shift' ]);
				break;
			case '?':
				robot.keyTap('/', [ 'shift' ]);
				break;
			case ':':
				robot.keyTap(';', [ 'shift' ]);
				break;
			case '"':
				robot.keyTap("'", [ 'shift' ]);
				break;
			default:
				if (/[A-Z]/.test(key)) {
					robot.keyTap(key.toLowerCase(), [ 'shift' ]);
				} else {
					robot.keyTap(key);
				}
				break;
		}
	});
}

const upload = async () => {
	console.log('uploading...');
	const { code, signal, response } = await run(
		`curl -F files=@/Users/bchoii/Downloads/printer.zip https://asd:asd@drive.kidoapps.com/upload`
	);
	return 'https://asd:asd@drive.kidoapps.com/' + JSON.parse(response)[0].path;
};

module.exports = { run, sleep, _pbcopy, keyTap, type, upload };
