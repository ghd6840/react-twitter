import React, { useState, useEffect } from "react";
import { dbService } from "myFirebase";
import {
    collection,
    onSnapshot,
    query,
    orderBy,
  } from 'firebase/firestore';
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, 'tweets'),
      orderBy('createdAt', 'desc')
    );
    onSnapshot(q, (snapshot) => {
      const tweetArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTweets(tweetArray);
    });
  }, []);
  return (
    <div className="container">
      <TweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {tweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetObj={tweet}
            isOwner={tweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;