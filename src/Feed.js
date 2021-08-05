import React, { useState, useEffect } from 'react';
import './Feed.css';
import CreateIcon from '@material-ui/icons/Create';
import InputOption from './InputOption';
import ImageIcon from '@material-ui/icons/Image';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CalendarViewDayIcon from '@material-ui/icons/CalendarViewDay';
import Post from './Post';
import { db } from './firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import FlipMove from 'react-flip-move';

function Feed() {

    const user = useSelector(selectUser);
    const [input, setInput] = useState("");
    const [posts, setPosts] = useState([]);

    // it will fire code when Feed component is load and also when re-render happens.
    //but when we give second parameter as [] it will only fire Feed component once
    useEffect(() => {
        //snapshot will give the real time listener to firebase collection of db
        //db contains -> collection contains -> docs contains -> values like id, data
        //added orderBy to sort the new post at top
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => (
            //everytime posts change update setPosts state
            setPosts(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data(),
                })
            ))
        ))
    }, [])

    const sendPost = (e) => {
        e.preventDefault(e);

        db.collection('posts').add(
            {
                name: user.displayName,
                description: user.email,
                message: input,
                photoUrl: user.photoUrl || '',
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }
        );

        setInput("");
    };

    return (
        <div className="feed">
            <div className='feed__inputContainer'>
                <div className="feed__input">
                    <CreateIcon />
                    <form>
                        <input value={input} onChange={e => setInput(e.target.value)} type="text" />
                        <button onClick={sendPost} type='submit'>Send</button>
                    </form>
                </div>
                <div className="feed__inputOptions">
                    <InputOption Icon={ImageIcon} title='Photo' color='#7085F9' />
                    <InputOption Icon={SubscriptionsIcon} title='Video' color='#03fc80' />
                    <InputOption Icon={EventNoteIcon} title='Event' color='#f5e942' />
                    <InputOption Icon={CalendarViewDayIcon} title='Write article' color='#f003fc' />
                </div>
            </div>

            <FlipMove>
                {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
                    <Post
                        key={id}
                        name={name}
                        description={description}
                        message={message}
                        photoUrl={photoUrl}
                    />
                ))}
            </FlipMove>
            {/* This is for ref:
            <Post name='Tejashree' description='This is test' message='This post worked'/> */}
        </div>


    )
}

export default Feed
