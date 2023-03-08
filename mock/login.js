const Mock = require('mockjs');

const { sleep } = require('./utils');

module.exports = {
    'GET /productopen/user': async (req, res) => {
        await sleep(0.4);
        res.status(200).json(
          Mock.mock({
            code: 200,
            data: {
              userId: 1,
              nickName: 'Kira',
            },
          }),
        );
      },
};
