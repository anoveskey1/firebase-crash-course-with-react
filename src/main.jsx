import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Auth from "./components/auth.jsx";
import { auth, db, storage } from "./config/firebase.js";
import { addDoc, collection, doc, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

const App = () => {
    const [albumList, setAlbumList] = React.useState([]);
    const [artist, setArtist] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [releaseDate, setReleaseDate] = React.useState(0);
    const [updatedGenre, setUpdatedGenre] = React.useState('');
    const [fileUpload, setFileUpload] = React.useState(null);

    const albumsCollectionRef = collection(db, 'music-albums');

    const addAlbum = async () => {
        try {
            await addDoc(albumsCollectionRef, {
                artist: artist,
                title: title,
                genre: genre,
                releaseDate: releaseDate,
                userId: auth?.currentUser?.uid
            });
        } catch (error) {
            console.error(error);
        }
    }

    const deleteAlbum = async (id) => {
        const albumDoc = doc(db, 'music-albums', id);
        try {
            await deleteDoc(albumDoc);
        } catch (error) {
            console.error(error);
        }
    }

    const updateAlbum = async (id) => {
        const albumDoc = doc(db, 'music-albums', id);
        try {
            await updateDoc(albumDoc, {
                // artist: artist,
                // title: title,
                genre: updatedGenre,
                // releaseDate: releaseDate
            });
        } catch (error) {
            console.error(error);
        }
    }

    const getAlbumList = async () => {
        try {
            const data = await getDocs(albumsCollectionRef);
            const filteredData = data.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            console.log(filteredData);
            setAlbumList(filteredData);
        } catch (error) {
            console.error(error);
        }
    }

    const uploadFile = async () => {
        if (!fileUpload) return;
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);

        try {
            await uploadBytes(filesFolderRef, fileUpload);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getAlbumList();
    }, []);

    return (
        <div>
            <Auth />
            <div>
                <input type="text" placeholder="Artist" onChange={e=> setArtist(e.target.value)}/>
                <input type="text" placeholder="Title" onChange={e=> setTitle(e.target.value)}/>
                <input type="text" placeholder="Genre" onChange={e=> setGenre(e.target.value)}/>
                <input type="number" placeholder="Release Date" onChange={e=> setReleaseDate(e.target.value)}/>
                <button onClick={addAlbum}>Add Album</button>
            </div>
            <div>
                <button onClick={getAlbumList}>Get Album List</button>
                {albumList.map(album => (
                    <div key={album.id}>
                        <h2>{album.title}</h2>
                        <p>{album.artist}</p>
                        <p>{album.releaseDate}</p>
                        <p>{album.genre}</p>
                        <button onClick={() => deleteAlbum(album.id)}>Delete Album</button>
                        <input type="text" placeholder="Update Genre" onChange={e=> setUpdatedGenre(e.target.value)}/>
                        <button onClick={() => updateAlbum(album.id)}>Update Genre</button>
                    </div>
                ))}
            </div>
            <div>
                <input type="file" onChange={e => setFileUpload(e.target.files[0])}/>
                <button onClick={uploadFile}>Upload file</button>
            </div>
        </div>
    );
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);
