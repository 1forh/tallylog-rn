import { firebase } from '@utils/firebase';

export const signInWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const { user } = userCredential;

      dispatch({
        type: 'user/SET_USER',
        payload: { email: user.email, uid: user.uid, name: user.displayName },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const createUserWithEmailAndPassword = (email, password, name) => {
  return async (dispatch) => {
    try {
      const userRef = await firebase.auth().createUserWithEmailAndPassword(email, password);

      await userRef.user.updateProfile({
        displayName: name,
      });

      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };
};

export const signOut = () => {
  return async (dispatch) => {
    try {
      await firebase.auth().signOut();
      dispatch({
        type: 'user/SET_USER',
        payload: {},
      });
    } catch (error) {
      throw error;
    }
  };
};
