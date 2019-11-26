const emptyToNull = require('../helpers/emptyStringCleaner');

module.exports = class Controller{
    constructor(model){
      this.model = model;
    }

    findAll() {
        return this.model.findAll();
    };

    findById(id) {
        return this.model.findOne({
            where: {
                id: id
            }
        });
    };

    create(data) {
        return this.model.create(data);
    }

    update(data) {
        return this.model.findOne({where: {id: data.id}})
            .then(details => {
                return details.update(emptyToNull(data)).then(res => res);
            });
    };
};