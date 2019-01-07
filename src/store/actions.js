import {
  paymentsCollection
} from '../../firebaseConfig';

const getUsers = (context) => {
  let users = [];
  paymentsCollection.get().then((querySnapshot) => {
    users = querySnapshot.docs.map((doc) => {
      let user = doc.data();
      user.uid = doc.id
      return user;
    });
    context.commit('USERS', users);
  });
};

const updateUser = (context, data) => {
  paymentsCollection.doc(data.uid).update(data).then(res => {
    context.dispatch('getUsers');
  })
}

export default {
  getUsers,
  updateUser,
};
