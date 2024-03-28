/* eslint-disable no-unused-vars */
import { useParams, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Photos.css";

export default function Photos() {
  const { id, albumId } = useParams();
  const limit = 8;
  const [photosArr, setPhotosArr] = useState([]);
  const [startPaging, setStartPaging] = useState(0);
  const [morePhotos, setMorePhotos] = useState(false);

  const fetchPhotosForAlbum = async (albumId) => {
    fetch(
      `http://localhost:3305/photos?albumId=${JSON.parse(
        albumId
      )}&_start=${startPaging}&_limit=${limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setPhotosArr((prevData) => [...prevData, ...data]);
          setStartPaging((prev) => prev + limit);
          setMorePhotos(true);
        }
        if (data.length < limit) setMorePhotos(false);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    fetchPhotosForAlbum(albumId);
  }, []);

  const editImg = async (photo, index) => {
    const newTitle = prompt("Enter your title:");
    const newPhoto = {
      albumId: photo.albumId,
      id: photo.id,
      title: newTitle,
      url: photo.url,
      thumbnailUrl: photo.thumbnailUrl,
    };
    try {
      // Assuming comment.id is available to identify the specific comment
      const response = await fetch(`http://localhost:3305/photos/${photo.id}`, {
        method: "PUT",
        body: JSON.stringify(newPhoto),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (!response.ok) {
        console.error("Failed to update photo:", response.statusText);
      } else {
        let newPhotos = [...photosArr];
        newPhotos[index] = newPhoto;
        setPhotosArr(newPhotos);
      }
    } catch (error) {
      console.error("Error updating photo:", error);
    }
  };

  const deleteImg = async (photo, index) => {
    try {
      // Assuming comment.id is available to identify the specific comment
      const response = await fetch(`http://localhost:3305/photos/${photo.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("Failed to delete photo:", response.statusText);
      } else {
        let newPhotos = photosArr.filter((item, i) => i !== index);
        setPhotosArr(newPhotos);
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };


const addPhoto = async () => {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.onchange = async (event) => {//אירוע שקורה כשהמשתמש בוחר תיקיה
    const file = event.target.files[0];//מחלץ את התקיה מהאירוע
    if (file) {
      const title = prompt("Enter the title for the photo:");

      const reader = new FileReader();//קורא את הקובץ שנבחר
      reader.onload = async (e) => {
        const imageDataUrl = e.target.result;//ממיר את מה שהתקבל URLל

        const newPhoto = {
          albumId: JSON.parse(albumId), 
          title: title,
          url: imageDataUrl,
          thumbnailUrl: imageDataUrl,
        };

        try {
          const response = await fetch("http://localhost:3305/photos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPhoto),
          });

          if (!response.ok) {
            alert("Failed to add photo:", response.statusText);
          } else {
            const addedPhoto = await response.json();
            setPhotosArr((prevData) => [addedPhoto, ...prevData]);
          }
        } catch (error) {
          console.error("Error adding photo:", error);
        }
      };

      reader.readAsDataURL(file);//ממיר ל onload כאשר מתבצע URL
    }
  };

  fileInput.click();//מדמה לחיצה
};


  return (
    <div>
      
      <h1>Albume {albumId}</h1>
      <button onClick={addPhoto}>Add photo</button>
      {photosArr.length > 0 && (
        <div className="photos">
          {photosArr.map((photo, index) => (
            <div key={photo.id} className="photoCont">
              <img
                className="imgPh"
                key={photo.id}
                src={photo.thumbnailUrl}
                alt={`Photo ${photo.id}`}
                title={photo.title}
              />
              <div className="btns">
                <button onClick={() => editImg(photo, index)}>✏️</button>
                <button onClick={() => deleteImg(photo, index)}>🗑️</button>
              </div>
            </div>
          ))}
        </div>
      )}
      {morePhotos && (
        <button onClick={() => fetchPhotosForAlbum(albumId)}>🔽</button>
      )}
    </div>
  );
}
