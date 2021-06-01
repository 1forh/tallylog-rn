import { firebase } from '@utils/firebase';
import { format as formatDate } from 'date-fns';

export const createLog = (log) => {
  const { uid } = firebase.auth().currentUser;

  log.owner = uid;
  log.created = firebase.firestore.Timestamp.now();

  return async () => {
    try {
      await firebase.firestore().collection(`logs`).add(log);
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

export const incrementTally = (itemId, by) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'items/INCREMENT_LOG_ITEM_TALLY', payload: by });
      await firebase.firestore().collection(`logs/Dxf7L5Po2KxDO9eisbIK/items`).doc(itemId).update('tally', firebase.firestore.FieldValue.increment(by));
    } catch (error) {
      dispatch({ type: 'items/DECREMENT_LOG_ITEM_TALLY', payload: by });
      console.error(error);
    }
  };
};

export const decrementTally = (itemId, by) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'items/DECREMENT_LOG_ITEM_TALLY', payload: by });
      await firebase
        .firestore()
        .collection(`logs/Dxf7L5Po2KxDO9eisbIK/items`)
        .doc(itemId)
        .update('tally', firebase.firestore.FieldValue.increment(by * -1));
    } catch (error) {
      dispatch({ type: 'items/INCREMENT_LOG_ITEM_TALLY', payload: by });
      console.error(error);
    }
  };
};

export const fetchLogs = () => {
  try {
    return async (dispatch) => {
      try {
        const { uid } = firebase.auth().currentUser;

        await firebase
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
          });
      } catch (error) {
        console.error(error);
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchItems = (logId) => {
  try {
    return async (dispatch) => {
      try {
        await firebase
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
                return item;
              });

            dispatch({ type: 'items/SET_ITEMS', payload: items });
          });
      } catch (error) {
        console.error(error);
      }
    };
  } catch (error) {
    console.log(error);
  }
};
