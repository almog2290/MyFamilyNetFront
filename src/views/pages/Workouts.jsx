import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';

//Custom Hooks
import { useAxioshGet } from 'hooks/useAxiosGet';
import { useAuthContext } from "../../hooks/useAuthContext";

// ==============================|| Workouts Page ||============================== //

const Workouts = () => {
    const { user } = useAuthContext();
    const BASE_URL = import.meta.env.VITE_APP_API_URL
    const { data:workouts, isPending, error } = useAxioshGet(BASE_URL + "/api/workout", user.token);
    
    return(
        <>
        {isPending && 
            <MainCard title={"Pending"}>
                <Typography variant="body2">
                    Loading...
                </Typography> 
            </MainCard>}
        {!isPending && workouts && (
            <MainCard title={`${user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)} workouts`} >
                <Grid container spacing={gridSpacing}>
                {workouts.map((workout) =>(
                        <Grid item xs={12} sm={6} key={workout.id}>
                            <Grid container direction="column" spacing={1}>
                                <SubCard title={workout.title}>
                                    <Typography variant="body2">
                                        {`Reps : ${workout.reps}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`Sets : ${workout.sets}`}
                                    </Typography>
                                    <Typography variant="body2">
                                        {`Weight : ${workout.weight}`}
                                    </Typography>
                                </SubCard>
                            </Grid>
                        </Grid>
                ))}
                </Grid>
            </MainCard>
        )}
        {error && 
        <MainCard title="Error">
                <Typography variant="body2">
                    {error}
                </Typography> 
        </MainCard>}
     </>
    );
};

export default Workouts;