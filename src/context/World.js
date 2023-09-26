const FlatWorldGenerator = require('../worldGenerators/FlatWorld');
const { QuickDB } = require("quick.db");

class World {
    constructor(srv, seed, generator = FlatWorldGenerator, hasNether = true, hasEnd = true, worldPath) {

        var { log } = srv;

        this.log = log;

        this.seed = seed;
        this.generator = new generator(seed);
        this.hasNether = hasNether;
        this.hasEnd = hasEnd;
        this.path = worldPath;

        this.db = new QuickDB({
            filePath: worldPath + '/level.db',
            table: 'level'
        });

        this.loadSeed();

    }

    async loadSeed() {
        if (!await this.db.get('seed')) {
            const Seed = require('seed-random');
            var seed = Seed()();
            console.log('s', seed)
            // await this.db.set('seed', seed)
        }

        var seed = await this.db.get('seed');
        this.log.info(`World seed: ${seed}`);
    }

}

module.exports = World;