const contentModel = require('../model/contentSchema');
const content_view = async (req,res) =>
{
  const data = await contentModel.find();
  res.status(200).json(
    {
    data
    });
}
module.exports = content_view;