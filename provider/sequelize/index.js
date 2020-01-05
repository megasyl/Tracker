class SequelizeProvider {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            return this.model.create(data);
        } catch (e) {
            console.log(`cannot create ${this.model.name} : ${e}`)
        }
    }

    async update(id, data) {
        try {
            await this.model.update(data, {
                where: {
                    id,
                },
            });
            return this.model.findOne({
                where: { id },
            });
        } catch (e) {
            console.log(`cannot update ${this.model.name} with id ${id} : ${e}`)
        }
    }
}

module.exports = SequelizeProvider;