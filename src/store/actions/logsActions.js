import { firebase } from '@utils/firebase';
import { format as formatDate, formatDistanceStrict } from 'date-fns';

export const deleteLog = (logId) => {
  return async (dispatch) => {
    try {
      await firebase.firestore().collection(`logs`).doc(logId).delete();
      dispatch({ type: 'items/REMOVE_LOG', payload: logId });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createLog = (log) => {
  const { uid } = firebase.auth().currentUser;

  log.name = log.name.trim();
  log.owner = uid;
  log.favorite = false;
  log.created = firebase.firestore.Timestamp.now();

  return async () => {
    try {
      await firebase.firestore().collection(`logs`).add(log);
    } catch (error) {
      console.error(error);
    }
  };
};

export const editLog = (logId, updates) => {
  updates.name = updates.name.trim();
  updates.edited = firebase.firestore.Timestamp.now();

  return async () => {
    try {
      await firebase.firestore().collection(`logs`).doc(logId).update(updates);
    } catch (error) {
      console.error(error);
    }
  };
};

export const editLogItem = (logId, itemId, updates) => {
  updates.name = updates.name.trim();
  updates.edited = firebase.firestore.Timestamp.now();

  return async () => {
    try {
      await firebase.firestore().collection(`logs/${logId}/items`).doc(itemId).update(updates);
    } catch (error) {
      console.error(error);
    }
  };
};

export const deleteItem = (logId, itemId) => {
  return async (dispatch) => {
    try {
      await firebase.firestore().collection(`logs`).doc(logId).collection('items').doc(itemId).delete();
      dispatch({ type: 'items/REMOVE_ITEM', payload: itemId });
    } catch (error) {
      console.error(error);
    }
  };
};

export const createItem = (logId, item) => {
  item.name = item.name.trim();
  item.created = firebase.firestore.Timestamp.now();
  item.tally = 0;

  return async () => {
    try {
      await firebase.firestore().collection(`logs`).doc(logId).collection('items').add(item);
    } catch (error) {
      console.error(error);
    }
  };
};

export const addItem = (itemId) => {
  return async (dispatch) => {
    try {
      const ref = await firebase.firestore().collection(`logs/Dxf7L5Po2KxDO9eisbIK/items`).doc(itemId).get();
      const data = ref.data();
      dispatch({ type: 'items/SET_ITEM', payload: data });
    } catch (error) {
      console.error(error);
    }
  };
};

export const incrementTally = (logId, itemId, by) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'items/INCREMENT_LOG_ITEM_TALLY', payload: by });
      await firebase
        .firestore()
        .collection(`logs/${logId}/items`)
        .doc(itemId)
        .update({ tally: firebase.firestore.FieldValue.increment(by), tallyUpdated: firebase.firestore.Timestamp.now() });
    } catch (error) {
      dispatch({ type: 'items/DECREMENT_LOG_ITEM_TALLY', payload: by });
      console.error(error);
    }
  };
};

export const decrementTally = (logId, itemId, by) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'items/DECREMENT_LOG_ITEM_TALLY', payload: by });
      await firebase
        .firestore()
        .collection(`logs/${logId}/items`)
        .doc(itemId)
        .update({ tally: firebase.firestore.FieldValue.increment(by * -1), tallyUpdated: firebase.firestore.Timestamp.now() });
    } catch (error) {
      dispatch({ type: 'items/INCREMENT_LOG_ITEM_TALLY', payload: by });
      console.error(error);
    }
  };
};

export const fetchLogs = () => {
  return async (dispatch) => {
    dispatch({ type: 'items/SET_LOGS_LOADING', payload: true });

    try {
      const { uid } = firebase.auth().currentUser;

      const unsubscribe = firebase
        .firestore()
        .collection(`logs`)
        .where('owner', '==', uid)
        .onSnapshot(async (snapshot) => {
          const logs = snapshot.docs
            .map((doc) => {
              return { id: doc.id, ...doc.data() };
            })
            .map((item) => {
              item.created = formatDate(item.created.toDate(), 'M/d/yyyy');

              if (item.edited) {
                item.edited = formatDate(item.edited.toDate(), 'M/d/yyyy');
              }
              return item;
            });

          dispatch({ type: 'items/SET_LOGS', payload: logs });
          dispatch({ type: 'items/SET_LOGS_LOADING', payload: false });
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'items/SET_LOGS_LOADING', payload: false });
    }
  };
};

export const fetchItems = (logId) => {
  return async (dispatch) => {
    dispatch({ type: 'items/SET_ITEMS_LOADING', payload: true });

    try {
      const unsubscribe = firebase
        .firestore()
        .collection(`logs`)
        .doc(logId)
        .collection('items')
        .onSnapshot(async (snapshot) => {
          const items = snapshot.docs
            .map((doc) => {
              return { id: doc.id, ...doc.data() };
            })
            .map((item) => {
              item.created = formatDate(item.created.toDate(), 'M/d/yyyy');
              if (item.edited) {
                item.edited = formatDate(item.edited.toDate(), 'M/d/yyyy');
              }
              if (item.resetOn) {
                item.resetOn = formatDate(item.resetOn.toDate(), 'M/d/yyyy');
              }
              if (item.tallyUpdated) {
                item.tallyUpdated = formatDistanceStrict(item.tallyUpdated.toDate(), new Date(), { addSuffix: true });
              }
              return item;
            });

          for (const item of items) {
            const historySnapshot = await firebase.firestore().collection(`logs`).doc(logId).collection('items').doc(item.id).collection('history').orderBy('date').limit(10).get();
            const history = historySnapshot.docs
              .map((doc) => ({ id: doc.id, ...doc.data() }))
              .map((item) => {
                if (item.date) {
                  item.date = formatDate(item.date.toDate(), 'M/d/yyyy');
                }
                return item;
              });
            item.history = history;
          }

          dispatch({ type: 'items/SET_ITEMS', payload: items });
          dispatch({ type: 'items/SET_ITEMS_LOADING', payload: false });
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: 'items/SET_ITEMS_LOADING', payload: false });
    }
  };
};
