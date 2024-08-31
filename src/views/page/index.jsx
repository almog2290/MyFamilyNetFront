import React , { useState}from 'react'
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from "hooks/useAxiosPrivate";


// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { Grid } from '@mui/material';
import  PostLine  from './PostLine';


function Page() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [id , setId] = useState(searchParams.get('id'));
    const [name , setName] = useState(searchParams.get('name'));
    const [desc , setDesc] = useState(searchParams.get('desc'));
    
    const axiosPrivate = useAxiosPrivate();

    const {data: posts, isError , isPending} = useQuery({
        queryKey: ['posts', [id, name, desc]],
        queryFn: async () => {
            const response = await axiosPrivate.get(`/social/posts/page/${id}`);
            console.log(response.data);
            return response.data;
        }
    });

    return (
        <>
        <MainCard 
            title={name? name : "Page"} 
            subTitle={desc? desc : "Information about the page"}
        >
        <Grid container direction="column" spacing={1}>        
                {isPending && <div>Loading...</div>}
                {isError && <div>Error fetching data</div>}
                {posts && posts.map(post => (
                    <Grid item key={post.id}>
                        <SubCard title={<PostLine postData={post}/>}>
                            <Typography variant="overline">
                                {"Comments"}
                            </Typography>
                        </SubCard>
                    </Grid>
                ))}
        </Grid>
    </MainCard>
    </>
    )
}

export default Page
