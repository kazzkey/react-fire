import React, { useEffect, useState } from 'react';
import firebase from '../firebase';

const App = () => {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [documentId, setDocumentId] = useState('');

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('users').onSnapshot((querySnapshot) => {
      const _users = querySnapshot.docs.map(doc => {
        return ({
          userId: doc.id,
          ...doc.data()
        })
      });
      setUsers(_users);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const handleFetchBtn = async () => {
    const db = firebase.firestore();
    const snapshot = await db.collection('users').get();
    const _users = [];
    snapshot.forEach((doc) => {
      _users.push({
        userId: doc.id,
        ...doc.data()
      });
    });
    setUsers(_users);
  };

  const handleAddBtn = async () => {
    if (!userName || !age) {
      alert("フォームに値を入力してください。");
      return;
    }
    const parseAge = parseInt(age, 10);
    if (isNaN(parseAge)) {
      alert("年齢は半角数字で入力してください。");
      return;
    }
    const db = firebase.firestore();
    await db.collection('users').add({
      name: userName,
      age: parseAge
    });
    setUserName('');
    setAge('');
  }

  const handleUpdateBtn = async () => {
    if (!documentId) {
      alert("更新するIDを入力してください。");
      return;
    }

    const newData = {};
    if (userName) {
      newData['name'] = userName;
    }
    if (age) {
      newData['age'] = parseInt(age, 10);
    }

    try {
      const db = firebase.firestore();
      await db.collection('users').doc(documentId).update(newData);
      setUserName('');
      setAge('');
      setDocumentId('');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteBtn = async () => {
    if (!documentId) {
      alert("削除するIDを入力してください。");
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection('users').doc(documentId).delete();
      setUserName('');
      setAge('');
      setDocumentId('');
    } catch (error) {
      console.error(error);
    }
  }

  const userListItems = users.map(user => {
    return(
      <li key={user.userId}>
        <ul>
          <li>ID: {user.userId}</li>
          <li>氏名: {user.name}</li>
          <li>年齢: {user.age}</li>
        </ul>
      </li>
    )
  })

  return(
    <div>
      <div>
        <label htmlFor="username">氏名：</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={(e) => {setUserName(e.target.value)}}
        />
        <label htmlFor="age">年齢：</label>
        <input
          type="text"
          id="age"
          value={age}
          onChange={(e) => {setAge(e.target.value)}}
        />
        <label htmlFor="documentId">ID：</label>
        <input
          type="text"
          id="documentId"
          value={documentId}
          onChange={(e) => {setDocumentId(e.target.value)}}
        />
      </div>
      
      <button onClick={handleAddBtn}>追加</button>
      <button onClick={handleFetchBtn}>取得</button>
      <button onClick={handleUpdateBtn}>更新</button>
      <button onClick={handleDeleteBtn}>削除</button>
      <div>
        <ul>{userListItems}</ul>
      </div>
    </div>
  );
}


export default App;