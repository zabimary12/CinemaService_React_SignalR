import React from "react";

const Progress =({classes, duration, playedSeconds, handleProgressControls}) => {

    return(
        <div>
            <input type="range" 
                style={{ marginLeft: '5%', width: '95%' }}
                value={playedSeconds}
                min="0"
                max={duration}
                step="1"
                //className={classes.videoControlsProgress}
                onChange={(e)=>handleProgressControls(e.target.value)}
                />
        </div>
    )
}
export default Progress