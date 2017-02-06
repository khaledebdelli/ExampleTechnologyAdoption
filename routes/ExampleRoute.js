'use strict'

module.exports = (app, router) => {

    router.route('/api/example')
        .get((req, res, next) => {

            let quantity = 1000;
            let data = [];
            let start_date = new Date('01-01-2016');
            let end_date = new Date('12-31-2016');

            for (let i = 0; i < quantity; i++) {

                let y = Math.floor((Math.random() * quantity) + 1);
                let date = createRandomDate(start_date, end_date);

                data.push({
                    y,
                    date
                });
            };

            return res.status(200).send({ data })

        });
};

var createRandomDate = (start_date, end_date) => {
    return new Date(start_date.getTime() + Math.random() * (end_date.getTime() - start_date.getTime()));
};