const argv = process.argv.slice(2);
const args = {};

while(argv.length > 0) {
    let av = argv.splice(0, 2);
    if(av[0].substr(0, 2) == '--') {
        let arg = av[0].substr(2);
        let val = av[1];
        if(!val || val.substr(0, 2) == '--') {
            if(val) {
                argv.unshift(val);
            }
            val = true;
        }

        args[arg] = isNaN(val) || typeof val == 'boolean' ? val : +val;
    }
}

if(args.sides < 3) {
    console.error('Son necesarios al menos 3 lados');
    return;
}

const SIDES = args.sides || 5;
const WIDTH = args.width || 200;
const HEIGHT = args.height || 200;

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getPath(dots) {
    let path = [];

    while(path.length < dots) {
        let x = getRandom(0, WIDTH);
        let y = getRandom(0, HEIGHT);

        path.push({
            x,
            y
        });
    }

    let centerX = WIDTH / 2;
    let centerY = HEIGHT / 2;

    let ordered = path.sort((a, b) => {
        let angleA = Math.atan2((a.x - centerX), (a.y - centerY));
        let angleB = Math.atan2((b.x - centerX), (b.y - centerY));

        return angleA > angleB ? -1 : 1;
    });

    return ordered.map(point => point.x + ' ' + point.y).join(' ');
}

for (let j = 0; j < (args['num-items'] || 1); j++) {
    var path = getPath(SIDES);
    var svg = `<svg width="${WIDTH}" height="${HEIGHT}"><path d="M${path}Z" /></svg>`;
    console.log(svg);
}
