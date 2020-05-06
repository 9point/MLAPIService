const FirebaseAdmin = require('firebase-admin');

async function genFetchModel(module, id) {
  const ref = FirebaseAdmin.firestore()
    .collection(module.COLLECTION_NAME)
    .doc(id);

  const doc = await ref.get();
  return doc.exists ? doc.data() : null;
}

async function genSetModel(module, model) {
  const ref = FirebaseAdmin.firestore()
    .collection(module.COLLECTION_NAME)
    .doc(model.id);

  await ref.set(model);
  return model;
}

async function genDeleteModel(module, model) {
  await genSetModel(module, { ...model, isDeleted: true });
}

function createQuery(module, cb) {
  return cb(FirebaseAdmin.firestore().collection(module.COLLECTION_NAME));
}

async function genRunQuery(query) {
  const snapshot = await query.get();
  const models = [];
  snapshot.forEach((doc) => {
    if (doc.exists) {
      models.push(doc.data());
    }
  });

  return models;
}

async function genRunQueryOne(query) {
  const models = await genRunQuery(query);
  if (models.length === 0) {
    return null;
  }
  return models[0];
}

function listenQuery(query, cb) {
  const stop = query.onSnapshot((snapshot) => {
    const changePartitions = {};
    snapshot.docChanges().forEach((change) => {
      const changeType = change.type;
      if (!changePartitions[changeType]) {
        changePartitions[changeType] = [];
      }

      changePartitions[changeType].push(change.doc.data());
    });

    cb(changePartitions);
  });

  return { stop };
}

module.exports = {
  createQuery,
  genDeleteModel,
  genFetchModel,
  genRunQuery,
  genRunQueryOne,
  genSetModel,
  listenQuery,
};