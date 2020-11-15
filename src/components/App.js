import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import '../App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [edit, setEdit] =useState(false);
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  // 状態監視
  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db.collection('blogs').onSnapshot((querySnapshot) => {
      const _blogs = querySnapshot.docs.map(doc => {
        return ({
          blogId: doc.id,
          ...doc.data()
        });
      });
      setBlogs(_blogs);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // 作成ボタン
  const handleAddBtn = async () => {
    if (!title || !content) {
      alert("フォームに値を入力してください。");
      return;
    };
    const db = firebase.firestore();
    await db.collection('blogs').add({
      title: title,
      content: content
    });
    setTitle('');
    setContent('');
  };

  // 編集ボタン
  const handleEditBtn = () => {
    setEdit(!edit);
  };

  // 更新ボタン
  const handleUpdateBtn = async (id) => {
    const newData = {};
    if (editTitle) {
      newData['title'] = editTitle;
    };
    if (editContent) {
      newData['content'] = editContent;
    };
    try {
      setEdit(false);
      const db = firebase.firestore();
      await db.collection('blogs').doc(id).update(newData);
    } catch (error) {
      console.error(error);
    };
  };

  // 削除ボタン
  const handleDeleteBtn = async (id) => {
    const result = window.confirm("削除してもよろしいですか？");
    if (result) {
      try {
        const db = firebase.firestore();
        await db.collection('blogs').doc(id).delete();
      } catch (error) {
        console.error(error);
      };
    } else {
      return;
    };
  };

  // ブログリスト
  const blogListItems = blogs.map(blog => {
    if (edit) {
      return (
        <div className="editForm">
          <input type="text"
                 value={editTitle}
                 placeholder={blog.title}
                 onChange={(e) => {setEditTitle(e.target.value)}}
          />
          <textarea
            value={editContent}
            placeholder={blog.content}
            onChange={(e) => {setEditContent(e.target.value)}}
          ></textarea>
          <div className="contentBtn">
            <button onClick={() => handleUpdateBtn(blog.blogId)}>更新</button>
            <button onClick={handleEditBtn}>キャンセル</button>
          </div>
        </div>
      );
    } else {
      return (
        <div key={blog.blogId} id="list" className="blogContent">
          <ul>
            <li>タイトル: {blog.title}</li>
            <li>本文: {blog.content}</li>
          </ul>
          <div className="contentBtn">
            <button onClick={handleEditBtn}>編集</button>
            <button onClick={() => handleDeleteBtn(blog.blogId)}>削除</button>
          </div>
        </div>
      );
    };
  });

  // 基本レンダー
  return(
    <div className="App">
      <h2>新規作成</h2>
      <div className="blogForm">
        <div>
          <input
            type="text"
            id="title"
            value={title}
            placeholder="タイトル"
            onChange={(e) => {setTitle(e.target.value)}}
          />
        </div>
        <div>
          <textarea
            id="content"
            value={content}
            placeholder="本文を入力してください"
            onChange={(e) => {setContent(e.target.value)}}
          ></textarea>
        </div>
        <div  className="contentBtn">
          <button onClick={handleAddBtn}>送信</button>
        </div>
        
      </div>
      <hr />
      <h2>ブログ一覧</h2>
      <div>
        {blogListItems}
      </div>
    </div>
  );
};

export default App;