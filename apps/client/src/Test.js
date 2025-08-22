import { useEffect, useState} from "react";
import React from "react";
function Content () {
    const [avatar, setAvatar] = useState()
    const handleChangeAvatar = (e) => {
        const file = e.target.files[0]
        avatar.preview = URL.createObjectURL(file)
        setAvatar(file)
        e.target.value=""
    }
    
    useEffect(() => {
        return () =>{
            avatar && URL.revokeObjectURL(avatar.preview)
        }
    },[avatar])
    return (
        <div>
            <input type="file"
                    onChange={handleChangeAvatar}    
            />
            {avatar && (
                <img src={avatar.preview} />
            )}
        </div>
    );
}