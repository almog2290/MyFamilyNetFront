import React , { useState}from 'react'
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAxiosPrivate } from "hooks/useAxiosPrivate";


// material-ui
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import  PostLine  from './PostLine';
import CommentList from './CommentList';
import PostCreationCard from './PostCreationCard';


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
                {isPending &&
                    <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                    </Box> 
                }
                {isError &&
                    <Alert severity="error">Error fetching data</Alert> 
                }
                {posts && posts.map(post => (
                    <Grid item key={post.id}>
                        <SubCard title={<PostLine postData={post}/>}>
                            <Typography variant="overline">
                                <CommentList postId={post.id}/>
                            </Typography>
                        </SubCard>
                    </Grid>
                ))}
            {!isPending &&
                <Grid item key={'card-creation'}>
                    <PostCreationCard pageId={id} />
                </Grid>
            }
        </Grid>
    </MainCard>
    </>
    )
}

export default Page
