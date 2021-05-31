import { firebase } from '@utils/firebase';
import { format as formatDate } from 'date-fns';

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

export const fetchItems = () => {
  try {
    return async (dispatch) => {
      try {
        // const { uid } = firebase.auth().currentUser;

        await firebase
          .firestore()
          .collection(`logs/Dxf7L5Po2KxDO9eisbIK/items`)
          .onSnapshot(async (snapshot) => {
            const items = snapshot.docs
              .map((doc) => {
                return { id: doc.id, ...doc.data() };
              })
              .map((item) => {
                item.dateBorrowed = formatDate(item.dateBorrowed.toDate(), 'M/d/yyyy');
                item.dateExpected = formatDate(item.dateExpected.toDate(), 'M/d/yyyy');
                return item;
              });

            console.log('hit');

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
