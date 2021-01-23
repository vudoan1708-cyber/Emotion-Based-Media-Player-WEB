module.exports = async function getAllData(db) {

  try {
    // find all
    return await db.find();
  } catch (err) {
    console.log(err);
    return err;
  }
}
