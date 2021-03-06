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

export const createUserWithEmailAndPassword = (email, password) => {
  return async (dispatch) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  };
};

export const updatePassword = (currentPassword, newPassword) => {
  return async (dispatch) => {
    try {
      const user = firebase.auth().currentUser;
      if (currentPassword === '') throw 'Enter your current password';
      if (newPassword === '') throw 'Enter your new password';

      await firebase.auth().signInWithEmailAndPassword(user.email, currentPassword);

      await user.updatePassword(newPassword);
    } catch (error) {
      throw error.message ? error.message : error;
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
