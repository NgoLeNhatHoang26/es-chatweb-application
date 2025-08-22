import { Box,OutlinedInput  } from "@mui/material";
import React, { useState, useMemo, useEffect} from "react";
import {debounce} from "lodash"
function SearchBar({onChange}) {
    const [query, setQuery] = useState(""); 
    const debounceQuery = useMemo(
        () => debounce((value) => onChange(value),300)  
    ,[])
    const handleChange = (e) => {
        setQuery(e.target.value)
        debounceQuery(e.target.value)
    }
    useEffect(() => {
    return () => debounceQuery.cancel();
    }, [debounceQuery]);
    return (

        <Box
            display={'flex'}
            alignItems={'center'}
            bgcolor={"background.paper2"}
            width={'100%'}
            p={{xs: 1, md: 2}}
            >
            <OutlinedInput
                defaultValue={query}
                onChange={handleChange}
                placeholder="Tìm kiếm người dùng"
                height={'10%'}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        width:'100%',
                        borderRadius: 4,
                        fontSize: {sm: "0.8rem",md: "1.2rem"},
                    },
                borderRadius: 4,
                width:'100%',
                }}
            />
        </Box>    
    );
}
export default React.memo(SearchBar)

