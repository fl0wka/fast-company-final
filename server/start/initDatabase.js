const professionMock = require('../mock/profession.json');
const qualityMock = require('../mock/quality.json');
const Profession = require('../models/Profession');
const Quality = require('../models/Quality');

module.exports = async () => {
  const professions = await Profession.find();
  if (professions.length !== professionMock.length) {
    await createInitialEntity(Profession, professionMock);
  }
  const qualities = await Quality.find();
  if (qualities.length !== qualityMock.length) {
    await createInitialEntity(Quality, qualityMock);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  await Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (err) {
        return err;
      }
    })
  );
}
